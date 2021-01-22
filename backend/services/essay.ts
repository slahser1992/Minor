import { spawn, Thread, Worker } from "threads"

import EssayModel, { Essay, EssayInput } from '@models/essay';
import { User, UserDoucment } from '@models/user';

class EssayService {
  static async postEssay(essay: EssayInput): Promise<Essay> {
    const essayModel = new EssayModel(essay);
    essayModel.postTime = new Date().getTime();
    await essayModel.save();

    return essayModel.toObject();
  }

  static async findEssayAuthor(essayId: string): Promise<User | void> {
    try {
      const essay = await EssayModel.findById(essayId).populate('author').exec();
      if (typeof essay?.author === "object") {
        const author = <UserDoucment>essay.author;
        return {
          ...author.toObject(),
        }
      } else {
        return;
      }
    } catch(e) {
      throw new Error("Can't find this essay author");
    }
  }

  static async findEssay(): Promise<Essay[]> {
    try {
      const essays = await EssayModel.find().populate('author');
      return essays;
    } catch (e) {
      throw new Error("Can't find any essay.");
    }
  }

  static async findOneEssay(id: String): Promise<Essay | null> {
    try {
      const essay = await EssayModel.findById(id).populate('author');
      const postsRef = essay?.toObject().contentRef;

      const worker = await spawn(new Worker("../utils/worker"));
      const essayContent = await worker.readFileWorker(postsRef);
      await Thread.terminate(worker);

      if (essay) {
        essay.content = essayContent;
      }
      return essay;
    } catch (e) {
      throw new Error("Can't find this essay.");
    }
  }
}

export default EssayService;