import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs } from './config/schema.js';
import { resolvers } from './config/resolvers.js';
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';
import conectarDB from './config/config.js';
import { expressMiddleware } from '@apollo/server/express4';

// Constants
const PORT = process.env.PORT || 3000;

// Create main app
const app = express();
const httpServer = http.createServer(app);

// ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

  await server.start(); //iniciar servidor Apollo
  server.applyMiddleware({ app }); //aplicar middleware apollo a express

// configurar Routes y middlewares de Express
app.use(express.static('public'));
conectarDB(); // Utiliza la función importada
app.use('/db', cors(), express.json(), expressMiddleware(server));

// Server startup
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
