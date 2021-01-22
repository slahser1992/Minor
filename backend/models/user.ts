import {
  Schema,
  Document,
  model,
  Model,
} from 'mongoose';
import jwt from 'jsonwebtoken';
import constant from '../config/constant.json';

import { Essay } from './essay';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  essay: [{
    type: Schema.Types.ObjectId,
    ref: 'Essay',
  }]
});

enum Gender {
  Male = 1,
  Female = 0
}

export interface Token {
  token: string;
}

export interface LoginUser {
  name: string;
  password: string;
}

export interface User extends LoginUser {
  id: string;
  age: number;
  gender: Gender;
  email: string;
  essay?: Essay[];
}

UserSchema.virtual('fullName').get(function(this: User) {
  return this.name;
});

UserSchema.methods.getGender = (user: User) => 
  user.gender > 0 
  ? "Male"
  : "Female";

UserSchema.methods.getToken = (user: User) =>
  jwt.sign({
    _id: user.id,
    name: user.name,
    email: user.email,
  }, constant.secret, {
    expiresIn: '15d',
  });

interface UserBaseDocument extends User, Document {
  getGender(user: User): string;
  getToken(user: User): string;
}

export interface UserDoucment extends UserBaseDocument {}

export interface UserModel extends Model<UserDoucment> {}

export default model<UserDoucment>("User", UserSchema)