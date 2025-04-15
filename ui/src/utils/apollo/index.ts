import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

import { SessionStorage } from "utils/helpers";

const linkChain = createPersistedQueryLink({ sha256 }).concat(
  new HttpLink({
    uri: process.env.GRAPH_BASE_PATH || "http://127.0.0.1:4000/",
  })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  const session = new SessionStorage();
  const token = session.getData("token");

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, linkChain),
});

export default client;
