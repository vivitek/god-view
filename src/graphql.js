import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    split,
    concat
} from "@apollo/client";
import { BASE_URL, BASE_WS } from "./constant";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: `${BASE_URL}/graphql`,
});

const wsLink = new WebSocketLink({
    uri: `${BASE_WS}/graphql`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const auth = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('gv_token') || null}`,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
    link: concat(auth, splitLink),
    cache: new InMemoryCache(),
});

export { client }