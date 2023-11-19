// General imports
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

// Apollo imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginDrainHttpServer
} from '@apollo/server/plugin/drainHttpServer';

// Application imports
import { dbConnection } from './config/config.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

// Constants
const PORT = process.env.PORT || 4000;

// Create main app
const app = express();
const httpServer = http.createServer(app);

// ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Routes
app.use(express.static('public'));  // Serves the static files
dbConnection();
app.use('/db', cors(), express.json(), expressMiddleware(server)); // DB endpoint

// Server startup
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);