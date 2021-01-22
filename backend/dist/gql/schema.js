"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var apollo_server_koa_1 = require("apollo-server-koa");
var book_1 = require("./book");
var Query = apollo_server_koa_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    _empty: String\n  }\n"], ["\n  type Query {\n    _empty: String\n  }\n"])));
var resolvers = {};
exports.default = apollo_server_koa_1.makeExecutableSchema({
    typeDefs: [Query, book_1.typeDef],
    resolvers: lodash_1.merge(resolvers, book_1.resolvers),
});
var templateObject_1;
//# sourceMappingURL=schema.js.map