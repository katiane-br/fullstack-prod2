import Subject from "../models/Subject.js";
import Semestre from "../models/Semester.js";

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Subject.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Subject.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    semesters: async () => {
      try {
        return await Semestre.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    semester: async (_, { id }) => {
      try {
        return await Semestre.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createSubject: async (_, args) => {
      try {
        const subject = new Subject(args);
        await subject.save();
        return subject;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateSubject: async (_, { id, ...args }) => {
      try {
        return await Subject.findByIdAndUpdate(id, args, { new: true });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        await Subject.findByIdAndDelete(id);
        return "Subject deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createSemester: async (_, args) => {
      try {
        const semester = new Semestre(args);
        await semester.save();
        return semester;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateSemester: async (_, { id, ...args }) => {
      try {
        return await Semestre.findByIdAndUpdate(id, args, { new: true });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteSemester: async (_, { id }) => {
      try {
        await Semestre.findByIdAndDelete(id);
        return "Semester deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export { resolvers };
