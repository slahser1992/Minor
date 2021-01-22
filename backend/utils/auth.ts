
import { AuthenticationError } from 'apollo-server-koa';
import jwt from 'jsonwebtoken';

import config from '@config/index';
import { User } from '@gql/user';

const getUserByAuth = async (auth: string): Promise<User | void> => {
  if(!auth) throw new AuthenticationError('You must be logged in!');
  const user = await jwt.verify(auth, config._secret, (err, decode) => {
    if (err) throw new AuthenticationError(err.message);
    return decode;
  });
  return user;
}

export {
  getUserByAuth
}
