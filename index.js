import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { allData } from './data/data.js';
import 'dotenv/config';

//schema
const typeDefs = `#graphql

  type Subject {
    id: ID!
    name: String!
    descrip: String
    status: Int!
    difficulty: Int
    grade: Int
    like: Boolean
  }

  type Semester {
    id: ID!
    name: String!
    year: Int!
    start: String!
    end: String!
    descrip: String
    color: String!
    kind: Int!
    tutorized: Boolean
    subjects: [Subject]
  }

  type Query {
    semesters: [Semester]
    getSemesterById(id: ID!): Semester
    getSubjects: [Subject]
    getSubjectById(id: ID!): Subject
  }
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    semesters: () => allData.semesters,
    getSemesterById: (obj, {id}) => allData.semesters.find(semester => semester.id === id),
    getSubjects: () => allData.subjects,
    getSubjectById: (obj, {id}) => allData.subjects.find(subject => subject.id === id),
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