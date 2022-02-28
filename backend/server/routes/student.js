"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const student_1 = require("../controllers/student");
const utils_1 = require("../utils");
router.get('/', utils_1.AuthGuard, student_1.AllStudents);
// router.post('/', AddStudent);
router.get('/:id', student_1.GetStudentById);
router.get('/:id/courses', student_1.GetCoursesByStudentId);
router.put('/:id', student_1.UpdateStudentById);
router.put('/:id/add', student_1.AddCourseByCode);
router.delete('/:id', student_1.DeleteStudentById);
router.delete('/:id/drop', student_1.DropCourseByCode);
