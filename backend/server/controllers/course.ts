import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';
import Course from '../models/course';

export const AllCourses = (req: Request, res: Response, next: NextFunction) => {
  Course
    .find()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const GetCourseById = (req: Request, res: Response, next: NextFunction) => {
  const courseCode = req.params.id;

  Course
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

export const AddCourse = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);

  const newCourse = new Course({
    code: req.body.code,
    name: req.body.name,
    section: req.body.section,
    semester: req.body.semester
  });

  Course
    .create(newCourse)
    .then((course) => {
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const UpdateCourseById = (req: Request, res: Response, next: NextFunction) => {
  const courseCode = req.params.id;

  const updates = {
    name: req.body.name,
    section: req.body.section,
    semester: req.body.semester
  };

  Course
    .findByIdAndUpdate(courseCode, updates, { new: true })
    .then((course) => {
      if(course === null)
        return res.status(404).json('Course not found');
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const DeleteCourseById = (req: Request, res: Response, next: NextFunction) => {
  const courseCode = req.params.id;

  Course
    .findByIdAndDelete(courseCode)
    .then((course) => {
      if(course === null)
        return res.status(400).json('Course not found');
      
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};