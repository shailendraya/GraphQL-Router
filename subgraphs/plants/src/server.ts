import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import depthLimit from "graphql-depth-limit";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { applyMiddleware } from "graphql-middleware";
import { isAdmin, isAuthenticated, verifyToken } from "common";
import { not, or, shield } from "graphql-shield";
import costAnalysis from "graphql-cost-analysis";

import resolvers from "./graphql/resolvers";
import { GraphQLError } from "graphql";

const PORT = process.env.SUBGRAPH_PORT ?? 4300;
const MAX_COST = 10; // Maximum allowed cost

const costOptions = {
  maximumCost: MAX_COST,
  defaultCost: 1,
  complexityRangs: {
    min: 1,
    max: 3,
  },
  onComplete: (cost) => {
    console.log(`Query cost: ${cost}`);
  },
  createError: (error) => {
    throw new GraphQLError(`You have exceeded the query limit ${error}`);
  },
};

async function main() {
  const typeDefs = gql(
    readFileSync("src/graphql/schema.graphql", {
      encoding: "utf-8",
    })
  );

  const permissions = shield({
    Mutation: {
      addPlant: or(isAuthenticated, isAdmin),
      updatePlant: or(isAuthenticated, isAdmin),
    },
  });

  const server = new ApolloServer({
    schema: applyMiddleware(
      buildSubgraphSchema({ typeDefs, resolvers }),
      permissions
    ),
    validationRules: [depthLimit(5), costAnalysis(costOptions)],
    context: ({ req }) => {
      const { authorization } = req.headers;
      if (authorization) {
        const user = verifyToken(authorization);
        return { user };
      }
      return {};
    },
  });

  await server
    .listen({ port: PORT })
    .then(({ url }) => console.log(`Subgraph ready at: ${url}graphql`));
}

main();
