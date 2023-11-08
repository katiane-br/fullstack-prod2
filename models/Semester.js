import mongoose from "mongoose";
import Subject from "./Subject.js";

const semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    year: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    descrip: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        required: true
    },
    kind: {
        type: Number,
        required: true
    },
    tutorized: Boolean,
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],
},
    { timestamps: true, }

);

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;