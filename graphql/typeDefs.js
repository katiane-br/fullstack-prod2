//schema
const typeDefs = `#graphql

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
    getSubjectById(id: ID!): Subject
  }

  type Mutation {
    createSemester(
        name: String!, year: Int!, start: String!, end: String!, descrip: String, color: String!, kind: Int!, tutorized: Boolean): Semester
    updateSemester(
        id: ID!, name: String, year: Int, start: String, end: String, descrip: String, color: String, kind: Int, tutorized: Boolean): Semester
    deleteSemester(
        id: ID!): Semester

    createSubject(
        name: String!, descrip: String, status: Int!, difficulty: Int, grade: Int, like: Boolean): Subject
    updateSubject(
        id: ID!, name: String, descrip: String, status: Int, difficulty: Int, grade: Int, like: Boolean): Subject
    deleteSubject(
        id: ID!): Subject
  }
`;

export default typeDefs;