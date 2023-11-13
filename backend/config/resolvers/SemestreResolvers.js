// resolvers/SemesterResolvers.js
const Semester = require('../models/Semester');

const resolvers = {
  Query: {
    getAllSemesters: async () => {
      try {
        const semesters = await Semester.find();
        return semesters;
      } catch (error) {
        throw new Error('Error al obtener los semestres');
      }
    },
    // Otros resolvers relacionados con Semester
  },
};

module.exports = resolvers;
