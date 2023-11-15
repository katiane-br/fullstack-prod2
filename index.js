import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import taskdata from './data/tasks_data.json' assert { type: "json" };

import SemestersController from "./controllers/SemestersController.js";
import SubjectsController from "./controllers/SubjectsController.js";

import 'dotenv/config';


import mongoose from 'mongoose';
const dbUrl = 'mongodb+srv://JackX:AqYHc3DBhHDT98st@clusterp2jackx.pqmdrue.mongodb.net/';

mongoose.connect(dbUrl)
.then(mongoose => console.log( 'Conectado a la BD' ))
.catch(err => console.log(err));

console.log(`URL: ${dbUrl}`);


//schema
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Task" type defines the queryable fields for task in our data source.
  type Task {
    id:ID!,
    name:String!,
    description:String,
    days:Int,
  }

  # This "Semester" type defines the queryable fields for semester in our data source.
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

  # This "Subject" type defines the queryable fields for subject in our data source.
  type Subject {
    id: ID!
    semId: ID!
    name: String!
    descrip: String
    status: Int!
    difficulty: Int
    grade: Int
    like: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    tasks: [Task]
  }

  # case, the "semesters" o "subjects" query returns an array.
  type Query {
    semesters: [Semester]
    getSemesterById(id: ID!): Semester
    subjects: [Subject]
    getSubjectById(id: ID!): Subject
    getSubjectBySemId(semId: ID!): Subject
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    tasks: () =>{
      return taskdata;
    } ,
    semesters: async () => {
      return await SemestersController.getSemestersList()
    },
    getSemesterById: async (obj, { id }) => {
      return await SemestersController.getSemesterById(id);
    },
    subjects: async () => {
      return await SubjectsController.getSubjectList()
    },
    getSubjectById: async (obj, { id }) => {
      return await SubjectsController.getSubjectById(id);
    },
    getSubjectBySemId: async (obj, { semId }) => {
      return await SubjectsController.getSubjectBySemId()
    }
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