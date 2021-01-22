import { MinLength, MaxLength } from 'class-validator';
import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  InputType,
  Ctx,
  Args,
} from 'type-graphql';

import EssayService from '../services/essay';
import { getUserByAuth } from '../utils/auth';
import { User } from './user';
import { Context } from '@gql/user';

@ObjectType({description: 'The essay model.'})
export class Essay {
  @Field(type => ID)
  _id: string;

  @Field({ description: "essay author."})
  author: User;

  @Field({ description: "essay content.", defaultValue: "empty content." })
  content: string;

  @Field({ description: "essay title."})
  title: string;

  @Field({ description: "essay description."})
  description: string;

  @Field({ description: "essay post time."})
  postTime: number;
}

@InputType()
export class EssayInput {
  @Field()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @Field({ description: "essay content."})
  content: string;
}


@Resolver(Essay)
export class EssayResolver {
  @Authorized()
  @Mutation(returns => Essay)
  async postEssay(@Ctx() ctx: Context, @Arg("essay") essay: EssayInput) {
    const user = await getUserByAuth(ctx.auth);
    if (user) {
      const ret = await EssayService.postEssay({...essay, author: user._id});
      return ret; 
    }
  }

  // @Authorized()
  @Query(returns => User)
  async findEssayAuthor(@Arg("id") id: string) {
    const ret = await EssayService.findEssayAuthor(id);
    return ret;
  }

  @Query(returns => [Essay])
  async findEssay() {
    const ret = await EssayService.findEssay();
    return ret;
  }

  @Query(returns => Essay)
  async findOneEssay(@Arg("id") id: String) {
    const ret = await EssayService.findOneEssay(id);
    return ret;
  }
}