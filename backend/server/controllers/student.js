"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStudentById = exports.DropCourseByCode = exports.AddCourseByCode = exports.UpdateStudentById = exports.GetCoursesByStudentId = exports.GetStudentById = exports.AllStudents = void 0;
const mongodb_1 = require("mongodb");
const student_1 = __importDefault(require("../models/student"));
const course_1 = __importDefault(require("../models/course"));
const AllStudents = (req, res, next) => {
    student_1.default
        .find()
        .then((students) => {
        res.status(200).json(students);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.AllStudents = AllStudents;
const GetStudentById = (req, res, next) => {
    const studentId = req.params.id;
    student_1.default
        .findOne({ studentId: studentId })
        .then((student) => {
        if (student === null)
            return res.status(400).json('Student not found');
        res.status(200).json(student);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.GetStudentById = GetStudentById;
const GetCoursesByStudentId = (req, res, next) => {
    const studentId = req.params.id;
    student_1.default
        .find({ studentId: studentId })
        .populate('courses')
        .then((student) => {
        if (student === null)
            return res.status(400).json('Student not found');
        res.status(200).json(student);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.GetCoursesByStudentId = GetCoursesByStudentId;
const UpdateStudentById = (req, res, next) => {
    const studentId = req.params.id;
    const updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        program: req.body.program,
    };
    student_1.default
        .findByIdAndUpdate(studentId, updates, { new: true })
        .then((student) => {
        if (student === null)
            return res.status(404).json('Student not found');
        res.status(200).json(student);
    })
        .catch((err) => {
        res.status(400).json(err.messages);
    });
};
exports.UpdateStudentById = UpdateStudentById;
const AddCourseByCode = (req, res, next) => {
    const studentId = req.params.id;
    const courseId = new mongodb_1.ObjectId(req.body.courseId);
    console.log(courseId);
    student_1.default
        .findOneAndUpdate({ studentId: studentId }, { $addToSet: { courses: courseId } }, { returnDocument: 'after' })
        .then((student) => {
        console.log(student);
        course_1.default
            .findByIdAndUpdate(courseId, { $addToSet: { students: student === null || student === void 0 ? void 0 : student._id } }, { returnDocument: 'after' }).catch((err) => {
            return res.status(500).json(err);
        });
        res.status(200).json(student);
    });
};
exports.AddCourseByCode = AddCourseByCode;
const DropCourseByCode = (req, res, next) => {
    const studentId = req.params.id;
    const courseId = new mongodb_1.ObjectId(req.body.courseId);
    console.log(courseId);
    student_1.default
        .findOneAndUpdate({ studentId: studentId }, { $pull: { courses: courseId } }, { returnDocument: 'after' })
        .then((student) => {
        console.log(student);
        course_1.default
            .findByIdAndUpdate(courseId, { $pull: { students: student === null || student === void 0 ? void 0 : student._id } }, { returnDocument: 'after' }).catch((err) => {
            return res.status(500).json(err);
        });
        res.status(200).json(student);
    });
};
exports.DropCourseByCode = DropCourseByCode;
const DeleteStudentById = (req, res, next) => {
    const studentId = req.params.id;
    student_1.default
        .findByIdAndDelete(studentId)
        .then((student) => {
        if (student === null)
            return res.status(400).json('Student not found');
        res.status(200).json(student);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.DeleteStudentById = DeleteStudentById;
