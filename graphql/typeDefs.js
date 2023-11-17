//schema
const typeDefs = `#graphql

  scalar DateTime

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

  type Semester {
    id: ID!
    name: String!
    year: Int!
    start: DateTime!
    end: DateTime!
    descrip: String
    color: String!
    kind: Int!
    tutorized: Boolean
    subjects: [Subject]
  }

  type Query {
    semesters: [Semester]
    getSemesterById(id: ID!): Semester
    getSubjectsBySemesterId(semId: ID!): [Subject]
    getSubjectById(id: ID!): Subject
  }
`;

export default typeDefs;