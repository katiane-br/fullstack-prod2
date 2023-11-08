// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
      // semesters: () => allData.semesters,
      semesters: () => dbtest(),
      getSemesterById: (obj, {id}) => allData.semesters.find(semester => semester.id === id),
      getSubjects: () => allData.subjects,
      getSubjectById: (obj, {id}) => allData.subjects.find(subject => subject.id === id),
    },
  };


  export default resolvers;