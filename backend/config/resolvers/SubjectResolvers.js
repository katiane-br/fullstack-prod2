// resolvers/SubjectResolvers.js
const Subject = require('../models/Subject');

const resolvers = {
  Query: {
    getAllSubjects: async () => {
      try {
        const subjects = await Subject.find();
        return subjects;
      } catch (error) {
        throw new Error('Error al obtener las asignaturas');
      }
    },
    // Otros resolvers relacionados con Subject
  },
};

module.exports = resolvers;
