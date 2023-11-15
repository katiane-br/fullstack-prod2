import Subject from "../models/Subject.js";
import Semester from "../models/Semester.js";

const SubjectsController = {
    getSubjectById: async id => {
        return await Subject.findById(id);
    },
    getSubjectsBySemesterId: async semId => {
        return await Subject.find({ semId });
    },
    createSubject: async newSubject => {
        const subject = await Subject.create(newSubject);
        // Add subject to its semester
        await Semester.findByIdAndUpdate(
            newSubject.semId,
            { $push: { subjects: subject._id } }
        );
        return subject;
    },
    updateSubject: async (id, updatedSubject) => {
        return await Subject.findByIdAndUpdate(id, updatedSubject, {new: true});
    },
    deleteSubject: async id => {
        return Subject.findByIdAndDelete(id);
    },
};

export default SubjectsController;