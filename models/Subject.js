import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descrip: {
        type: String,
        trim: true
    },
    status: {
        type: Number,
        required: true
    },
    difficulty: Number,
    grade: Number,
    like: Boolean,
},
    { timestamps: true, }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;