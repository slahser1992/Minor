import { MinLength, MaxLength, IsEnum, Min, Max, IsEmail } from 'class-validator';
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
} from 'type-graphql';

import UserService from '../services/user';
import { getUserByAuth } from '../utils/auth';
import { Essay, EssayInput } from './essay';

export enum Gender {
  Male = 1,
  Female = 2,
}

export interface Context {
  auth: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MinLength(6)
  @MaxLength(26)
  password: string;

  @Field()
  @Min(18)
  @Max(120)
  age: number;

  @Field()
  @IsEnum(Gender)
  gender: number;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MinLength(6)
  @MaxLength(26)
  password: string;
}

@ObjectType({description: 'The book model.'})
export class User {
  @Field(type => ID)
  _id: string;

  @Field({ description: "user name." })
  name: string;

  @Field({ description: "user age."})
  age: number;

  @Field({ description: "user gender."})
  gender: number;

  @Field({ description: "user email."})
  email: string

  @Field({ description: "user token." })
  token: string;

  @Field({ description: "user full name." })
  fullName: string;
}

@Resolver(User)
export class UserResolver {

  @Authorized()
  @Query(returns => [User])
  async findAllUser() {
    const user = await UserService.findAll();
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  } 

  @Query(returns => User)
  async findUser(@Arg("id") id: string) {
    const user = await UserService.findById(id);
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  }

  @Authorized()
  @Query(returns => User)
  async profile(@Ctx() ctx: Context) {
    const user = await getUserByAuth(ctx.auth);
    return user;
  }

  @Mutation(returns => User)
  async loginUser(
    @Arg("user") userInput: LoginUserInput
  ) {
    const user = await UserService.login(userInput);
    return user;
  }

  @Mutation(returns => User)
  createUser(
    @Arg("user") userData: CreateUserInput,
  ) {
    return UserService.register(userData);
  }
}