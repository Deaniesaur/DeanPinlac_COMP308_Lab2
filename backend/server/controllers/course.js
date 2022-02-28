"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourseById = exports.UpdateCourseById = exports.AddCourse = exports.GetCourseById = exports.AllCourses = void 0;
const course_1 = __importDefault(require("../models/course"));
const AllCourses = (req, res, next) => {
    course_1.default
        .find()
        .then((courses) => {
        res.status(200).json(courses);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.AllCourses = AllCourses;
const GetCourseById = (req, res, next) => {
    const courseCode = req.params.id;
    course_1.default
        .findById(courseCode)
        .then((course) => {
        if (course === null)
            return res.status(400).json('Course not found');
        res.status(200).json(course);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.GetCourseById = GetCourseById;
const AddCourse = (req, res, next) => {
    console.log(req);
    const newCourse = new course_1.default({
        code: req.body.code,
        name: req.body.name,
        section: req.body.section,
        semester: req.body.semester
    });
    course_1.default
        .create(newCourse)
        .then((course) => {
        res.status(200).json(course);
    })
        .catch((err) => {
        res.status(400).json(err);
    });
};
exports.AddCourse = AddCourse;
const UpdateCourseById = (req, res, next) => {
    const courseCode = req.params.id;
    const updates = {
        name: req.body.name,
        section: req.body.section,
        semester: req.body.semester
    };
    course_1.default
        .findByIdAndUpdate(courseCode, updates, { new: true })
        .then((course) => {
        if (course === null)
            return res.status(404).json('Course not found');
        res.status(200).json(course);
    })
        .catch((err) => {
        res.status(400).json(err);
    });
};
exports.UpdateCourseById = UpdateCourseById;
const DeleteCourseById = (req, res, next) => {
    const courseCode = req.params.id;
    course_1.default
        .findByIdAndDelete(courseCode)
        .then((course) => {
        if (course === null)
            return res.status(400).json('Course not found');
        res.status(200).json(course);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
exports.DeleteCourseById = DeleteCourseById;
