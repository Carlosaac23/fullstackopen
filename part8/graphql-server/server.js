import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import User from "./models/User.js";

async function getUserFromAuthHeader(auth) {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }

  const decodeToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return User.findById(decodeToken.id).populate("friends");
}

export const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      const currentUser = await getUserFromAuthHeader(auth);
      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};
