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
import { toast } from "react-toastify"

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
    return forward(operation).map(res => {
        if (res.errors) {
            res.errors.forEach(error => {
                const code = error.extensions.exception.response.statusCode
                if (code === 401 || code === 403) {
                    localStorage.removeItem('gv_token')
                    window.location = "/login"
                } else {
                    toast("An error occured", {
                      type: "error",
                      position: toast.POSITION.BOTTOM_RIGHT,
                      style: {
                        backgroundColor: "#b53f3f"
                      },
                    });
                }
            });
        }
        return res
    })
})

const client = new ApolloClient({
    link: concat(auth, splitLink),
    cache: new InMemoryCache(),
});

export { client }