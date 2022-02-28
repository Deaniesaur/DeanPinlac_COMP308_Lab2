import express from 'express';
const router = express.Router();

export default router;

import {
  // AddStudent,
  AllStudents,
  DeleteStudentById,
  GetStudentById,
  GetCoursesByStudentId,
  UpdateStudentById,
  AddCourseByCode,
  DropCourseByCode
} from '../controllers/student';
import { AuthGuard } from '../utils';

router.get('/', AuthGuard, AllStudents);
// router.post('/', AddStudent);
router.get('/:id', GetStudentById);
router.get('/:id/courses', GetCoursesByStudentId);
router.put('/:id', UpdateStudentById);
router.put('/:id/add', AddCourseByCode);
router.delete('/:id', DeleteStudentById);
router.delete('/:id/drop', DropCourseByCode);