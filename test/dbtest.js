import Subject from "../models/Subject.js";
import Semester from "../models/Semester.js";



const dbtest = async (req, res) => {

    // Get all Semesters
    try {
        const semesters = await Semester.find({});
        console.log(semesters);
        return semesters;
        return res.send({msg: "All semesters", semesters});

    } catch(error) {
        console.log(error);
        return res.status(500).send({msg: "Error getting semesters"});
    }

    // // Create new semester
    // try {
    //     const newSemester = {
    //         name: "New semester",
    //         year: 2021,
    //         start: new Date(),
    //         end: new Date(),
    //         descrip: "New semester description",
    //         color: "blue",
    //         kind: 1,
    //         tutorized: false,
    //         subjects: []
    //     };
    //     const semester = await Semester.create(newSemester);
    //     console.log(semester);

    //     return res.send({msg: "Semester created", semester});

    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({msg: "Error creating semester", error});
    // }
};


export { dbtest };