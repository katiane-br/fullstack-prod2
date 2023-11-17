import Subject from "../models/Subject.js";

const SubjectsController = {
    getSubjectById: async id => {
        return await Subject.findById(id);
    },
    getSubjectsBySemesterId: async semId => {
        return await Subject.find({ semId });
    },
};

export default SubjectsController;