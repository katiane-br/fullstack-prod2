import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import taskdata from './data/tasks_data.json' assert { type: "json" };
import 'dotenv/config';

//schema
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Task" type defines the queryable fields for every book in our data source.
  type Task {
    id:ID!
    name:String!
    description:String
    days:Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    getTasks: [Task]
    getTaskById(id: ID!): Task
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getTasks: () => taskdata,
    getTaskById: (obj, {id}) => taskdata.find(task => task.id === id),
  },
};


const app = express();
const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// Also, can have plugins
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Routes
app.use(express.static('public'));
app.use('/db', cors(), express.json(), expressMiddleware(server));

// Server startup
const port = process.env.PORT || 4000;
await new Promise(resolve => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}`);