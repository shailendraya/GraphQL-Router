import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import depthLimit from "graphql-depth-limit";

import { buildSubgraphSchema } from "@apollo/subgraph";
import resolvers from "./graphql/resolvers";

const PORT = process.env.SUBGRAPH_PORT ?? 4200;
const isProduction = process.env.NODE_ENV === "production";

async function main() {
  const typeDefs = gql(
    readFileSync("src/graphql/schema.graphql", {
      encoding: "utf-8",
    })
  );

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    validationRules: [depthLimit(5)],
    context: ({ req }) => {
      return {};
    },
  });

  await server
    .listen({ port: PORT })
    .then(({ url }) => console.log(`Subgraph ready at: ${url}graphql`));
}

main();
