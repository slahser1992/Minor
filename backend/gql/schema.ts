import { AuthenticationError } from 'apollo-server-koa';
import { buildSchema, AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { 
  User,
  UserResolver,
} from './user';
import { EssayResolver } from './essay';
import constant from '../config/constant.json';
import { getUserByAuth } from '../utils/auth';

export const customAuthChecker: AuthChecker = (
  { root, args, context, info }: any, role
) => {
  const auth = context.auth;
  const user = getUserByAuth(auth);
  if (user) {
    return true;
  } else {
    return false;
  }
}

export default function buildMySchema() {
  return buildSchema({
    resolvers: [UserResolver, EssayResolver],
    authChecker: customAuthChecker,
  });
}