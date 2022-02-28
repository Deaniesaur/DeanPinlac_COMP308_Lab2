import express from 'express';
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
router.post('/', AddCourse);
router.get('/:id', GetCourseById);
router.put('/:id', UpdateCourseById);
router.delete('/:id', DeleteCourseById);