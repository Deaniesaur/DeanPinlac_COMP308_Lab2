"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const course_1 = require("../controllers/course");
router.get('/', course_1.AllCourses);
router.post('/', course_1.AddCourse);
router.get('/:id', course_1.GetCourseById);
router.put('/:id', course_1.UpdateCourseById);
router.delete('/:id', course_1.DeleteCourseById);
