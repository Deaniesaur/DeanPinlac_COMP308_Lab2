import express from 'express';
const router = express.Router();

export default router;

import {
  AllStudents,
  DeleteStudentById,
  GetStudentById,
  GetCoursesByStudentId,
  UpdateStudentById,
  AddCourseByCode,
  ChangeSectionByStudentId,
  DropCourseByCode
} from '../controllers/student';
import { AuthGuard } from '../utils';

router.get('/', AllStudents);
// router.post('/', AddStudent);
router.get('/:id', GetStudentById);
router.get('/:id/courses', AuthGuard, GetCoursesByStudentId);
router.put('/:id', UpdateStudentById);
router.put('/:id/add', AuthGuard, AddCourseByCode);
router.put('/:id/change', ChangeSectionByStudentId);
router.delete('/:id', DeleteStudentById);
router.delete('/:id/drop', DropCourseByCode);