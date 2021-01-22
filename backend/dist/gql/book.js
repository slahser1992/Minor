"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDef = void 0;
var apollo_server_koa_1 = require("apollo-server-koa");
exports.typeDef = apollo_server_koa_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    book(id: Int!): Book\n  }\n  type Book {\n    title: String\n    author: String\n  }\n"], ["\n  extend type Query {\n    book(id: Int!): Book\n  }\n  type Book {\n    title: String\n    author: String\n  }\n"])));
exports.resolvers = {
    Query: {
        book: function () {
            return { title: 'abc', author: "zou1111" };
        },
    },
    Book: {
        author: function () {
            return '123';
        },
    }
};
var templateObject_1;
//# sourceMappingURL=book.js.map