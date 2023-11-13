
// server.js
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('./config/database'); // Asumiendo que ya has configurado la conexión a MongoDB
const semesterResolvers = require('./resolvers/SemesterResolvers');
const subjectResolvers = require('./resolvers/SubjectResolvers');

const app = express();

const typeDefs = gql`
  # Incluir aquí los tipos definidos en SemesterSchema.graphql y SubjectSchema.graphql
`;

const resolvers = [semesterResolvers, subjectResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor GraphQL en http://localhost:${PORT}${server.graphqlPath}`);
});
