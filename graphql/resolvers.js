import SemestersController from "../controllers/SemestersController.js";
import SubjectsController from "../controllers/SubjectsController.js";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    semesters: async () => {
      return await SemestersController.getSemestersList()
    },
    getSemesterById: async (obj, { id }) => {
      return await SemestersController.getSemesterById(id);
    },
    getSubjectsBySemesterId: async (obj, { semId }) => {
      return await SubjectsController.getSubjectsBySemesterId(semId);
    },
    getSubjectById: async (obj, { id }) => {
      return await SubjectsController.getSubjectById(id);
    },
  },
};

export default resolvers;