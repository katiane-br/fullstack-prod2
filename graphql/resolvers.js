import SemestersController from "../controllers/SemestersController.js";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    semesters: async () => {
      return await SemestersController.getSemestersList()
    },
    getSemesterById: async (obj, { id }) => {
      return await SemestersController.getSemesterById(id);
    },
    getSubjectById: (obj, { id }) => allData.subjects
      .find(subject => subject.id === id),
  },

  Mutation:  {
    createSemester: async (obj, semData) => {
      semData.subjects = [];
      return await SemestersController.createSemester(semData);
    },
    updateSemester: async (obj, semData) => {
      return await SemestersController
        .updateSemester(semData.id, semData);
    },
    deleteSemester: async (obj, { id }) => {
      return await SemestersController.deleteSemester(id);
    },

    createSubject: async (obj, subjectData) => {
      return await SemestersController
        .createSubject(subjectData);
    },
    updateSubject: async (obj, subjectData) => {
      return await SemestersController
        .updateSubject(subjectData.id, subjectData);
    },
    deleteSubject: async (obj, { id }) => {
      return await SemestersController.deleteSubject(id);
    },
  },
};

export default resolvers;