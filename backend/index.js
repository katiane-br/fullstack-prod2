import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
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


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.SERVER_PORT || 4000 },
});

console.log(`🚀  Server port: ${process.env.SERVER_PORT}`);
console.log(`🚀  Server ready at: ${url}`);