import { AuthenticationError } from 'apollo-server-koa';
import bcrypt from 'bcrypt';

import UserModel, { 
  User, LoginUser, Token,
} from '@models/user';
import logger from '../utils/logger';
import { CreateUserInput } from '@gql/user';

class UserService {
  static async login(user: LoginUser): Promise<User & Token> {
    if (!user.name || !user.password) {
      throw new Error('name or password is null.');
    }
    const existUser = await UserModel.findOne({name: user.name});
    if (!existUser) {
      throw new AuthenticationError('this user is not found.');
    }
    const match = await bcrypt.compare(user.password, existUser.password);
    if (!match) throw new AuthenticationError('wrong password.');
    const token = existUser.getToken(existUser);
    return {
      ...existUser.toObject(),
      token,
    };
  }

  static async register(user: CreateUserInput): Promise<User & Token> {
    if (!! await UserModel.findOne({ name: user.name })) {
      throw new AuthenticationError('The user name has been used.');
    } else {
      const password = await bcrypt.hash(user.password, 10); //generate hash password
      const userInstance = new UserModel({
        ...user,
        password,
      });
      await userInstance.save();
      const token = userInstance.getToken(userInstance);
      return {
        ...userInstance.toObject(),
        token,
      };
    }
  }

  static async findById(id: string) {
    const user = await UserModel.findById(id);
    return user?.toObject({ virtuals: true });
  }

  static async findAll() {
    const users = await UserModel.find();
    return users;
  }
}

export default UserService;