import { GraphQLResponse } from 'apollo-server-types';

export interface Response {
  data: any;
  errMsg: string;
  errCode: string;
}

export function formatResponse(graphqlResponse: GraphQLResponse): Response {
  const response:Response = { data: {}, errMsg: "", errCode: "" };
  if (graphqlResponse.errors?.length) {
    response.errCode = graphqlResponse.errors[0].message;
    response.errMsg = graphqlResponse.errors[0].extensions
      ? graphqlResponse.errors[0].extensions.code
      : "GRAPHQL_NO_EXTENSIONS_CODE"
  } else {
    response.data = graphqlResponse.data;
  }
  return response;
}