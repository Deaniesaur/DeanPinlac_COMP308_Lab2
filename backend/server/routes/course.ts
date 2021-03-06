import express from 'express';
import { AuthGuard } from '../utils';
const router = express.Router();

export default router;

import {
  AddCourse,
  AllCourses,
  DeleteCourseById,
  GetCourseById,
  UpdateCourseById
} from '../controllers/course';

router.get('/', AllCourses);
router.post('/', AuthGuard, AddCourse);
router.get('/:id', GetCourseById);
router.put('/:id', UpdateCourseById);
router.delete('/:id', DeleteCourseById);