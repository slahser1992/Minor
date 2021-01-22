import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  extend type Query {
    book(id: Int!): Book
  }
  type Book {
    title: String
    author: String
  }
`;

export const resolvers = {
  Query: {
    book: () => {
      return {title: 'abc', author: "zou1111"}
    },
  },
  Book: {
    author: () => {
      return '123';
    },
  }
};