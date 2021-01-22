"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var apollo_server_koa_1 = require("apollo-server-koa");
var schema_1 = __importDefault(require("./gql/schema"));
var constant = __importStar(require("./config/constant.json"));
var config_1 = __importDefault(require("./config"));
var app = new koa_1.default();
var server = new apollo_server_koa_1.ApolloServer({ schema: schema_1.default, playground: true, introspection: true });
app.use(koa_bodyparser_1.default());
console.log(config_1.default._env);
console.log(process.env.NODE_ENV);
server.applyMiddleware({ app: app });
app.listen(constant.port, function () {
    console.log("Server ready at " + constant.port);
});
//# sourceMappingURL=index.js.map