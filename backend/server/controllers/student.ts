import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import Student from '../models/student';
import Course from '../models/course';

export const AllStudents = (req: Request, res: Response, next: NextFunction) => {
  Student
    .find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const GetStudentById = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;

  Student
    .findOne({ studentId: studentId })
    .then((student) => {
      if (student === null)
        return res.status(400).json('Student not found');

      res.status(200).json(student as StudentDocument);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const GetCoursesByStudentId = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;

  Student
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

export const UpdateStudentById = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;

  const updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    program: req.body.program,
  };

  Student
    .findByIdAndUpdate(studentId, updates, { new: true })
    .then((student) => {
      if(student === null)
        return res.status(404).json('Student not found');
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(400).json(err.messages);
    });
};

export const AddCourseByCode = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;
  const courseId = new ObjectId(req.body.courseId);

  console.log(courseId);
  Student
    .findOneAndUpdate({ studentId: studentId},
      { $addToSet: { courses: courseId} },
      { returnDocument: 'after' }
    )
    .then((student) => {
      console.log(student);
      Course
        .findByIdAndUpdate(courseId,
          { $addToSet: { students: student?._id } },
          { returnDocument: 'after' }
        ).catch((err) => {
          return res.status(500).json(err);
        });
      
      res.status(200).json(student);
    });
};

export const DropCourseByCode = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;
  const courseId = new ObjectId(req.body.courseId);

  console.log(courseId);
  Student
    .findOneAndUpdate({ studentId: studentId},
      { $pull: { courses: courseId} },
      { returnDocument: 'after' }
    )
    .then((student) => {
      console.log(student);
      Course
        .findByIdAndUpdate(courseId,
          { $pull: { students: student?._id } },
          { returnDocument: 'after' }
        ).catch((err) => {
          return res.status(500).json(err);
        });
      
      res.status(200).json(student);
    });
};

export const DeleteStudentById = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;

  Student
    .findByIdAndDelete(studentId)
    .then((student) => {
      if(student === null)
        return res.status(400).json('Student not found');
      
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};