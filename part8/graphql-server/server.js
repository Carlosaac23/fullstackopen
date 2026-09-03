import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

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

export async function startServer(port) {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return { currentUser };
      },
    }),
  );

  httpServer.listen(port, () => console.log(`Server is now running on http://localhost:${port}`));
}
