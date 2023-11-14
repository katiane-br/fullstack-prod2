import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';
import conectarDB from './config/config.js';

// Constants
const PORT = process.env.PORT || 3000;

// Create main app
const app = express();
const httpServer = http.createServer(app);

// ApolloServer constructor
const server = new ApolloServer({
  typeDefs: import('./config/schema.graphql'),
  resolvers: import('./config/resolvers.js'),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
server.applyMiddleware({ app });

// Routes
app.use(express.static('public'));
conectarDB(); // Utiliza la función importada
app.use('/db', cors(), express.json(), expressMiddleware(server));

// Server startup
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
