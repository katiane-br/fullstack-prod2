import Subject from "../models/Subject.js";
import Semester from "../models/Semester.js";

const SubjectsController = {
    getSubjectList: async () => {
        return await Subject.find({});
    },
    getSubjectById: async id => {
        return await Subject.findById(id);
    },
    getSubjectBySemId: async semId => {
        return await Subject.find({ semId: semId });
    }
};

export default SubjectsController;