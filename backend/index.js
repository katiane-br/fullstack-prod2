// General imports
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

// Apollo imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Application imports
// import { allData } from './data/data.js';
//import { dbConnection } from './config/config.js';
// import { dbtest } from './test/dbtest.js';
// Importa la función conectarDB desde ./config/config.js
import conectarDB from './config/config.js';
import { typeDefs, resolvers } from './config/schema.graphql';

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
await server.start();

// Routes
app.use(express.static('public'));
conectarDB(); // Utiliza la función importada
app.use('/db', cors(), express.json(), expressMiddleware(server));

// app.get('/dbtest', dbtest);

// Server startup
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);