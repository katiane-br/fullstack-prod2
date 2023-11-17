import Semester from "../models/Semester.js";

const SemestersController = {
    getSemestersList: async () => {
        return await Semester.find({});
    },
    getSemesterById: async id => {
        return await Semester.findById(id)
            .populate("subjects");
    },
};




export default SemestersController;
