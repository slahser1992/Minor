import Koa from 'koa';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import 'reflect-metadata';
import 'module-alias/register';

import buildMySchema from '@gql/schema';
import config from '@config/index';
import logger from '@utils/logger';

export interface Response {
  data: any;
  errMsg: string;
  errCode: string;
}

class App extends Koa {
  constructor() { 
    super();
    this.init();
  }

  async init() {
    /***** apollo server *****/
    const schema = await buildMySchema();
    const apolloServer = new ApolloServer({
      schema,
      playground: config._env === "development" ? true : false,
      introspection: config._env === "development" ? true : false,
      formatError: (err: GraphQLError) => {
        logger.error(err);
        return err;
      },
      context: async ({ ctx }) => {
        const auth = ctx.request.headers.authorization || '';
        return {
          auth
        };
      },
    });
    apolloServer.applyMiddleware({ app: this, cors: {
      origin: '*',
      credentials: true,
    }});

    /***** database connection *****/
    const db = mongoose.connection;
    mongoose.connect(config._db_address);
    db.on('error', () => logger.info('connection error:'));
    db.once('open', () => logger.info('db connection open'));

    /***** koa server *****/
    this.use(serve(__dirname + "/static"));
    this.listen(config._port, () => {
      logger.info(`Server ready at ${config._port}`);
    });
  }
}

new App();