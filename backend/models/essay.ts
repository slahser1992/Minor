import {
  Schema,
  Document,
  model,
  Model,
} from 'mongoose';
import { User } from './user';

const EssaySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  postTime: {
    type: Schema.Types.Date,
    required: true,
  },
  contentRef: {
    type: String,
    required: true,
  }
});

export interface EssayInput {
  author: string | User;
  title: string;
  content: string;
}

export interface Essay extends EssayInput {
  id: string;
  postTime: number;
  contentRef: string;
}

interface EssayBaseDocument extends Essay, Document {}

export interface EssayDoucment extends EssayBaseDocument {}

export interface EssayModel extends Model<EssayDoucment> {}

export default model<EssayDoucment>("Essay", EssaySchema);