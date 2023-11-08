import Semester from "../models/Semester.js";

const SemestersController = {
    getSemestersList: async () => {
        return await Semester.find({});
    },
    getSemesterById: async id => {
        return await Semester.findById(id)
            .populate("subjects");
    },
    createSemester: async newSemester => {
        return await Semester.create(newSemester);
    },
    updateSemester: async (id, updatedSemester) => {
        return await Semester.findByIdAndUpdate(id, updatedSemester, {new: true});
    },
    deleteSemester: async id => {
        return await Semester.findByIdAndDelete(id);
    },
};




export default SemestersController;
