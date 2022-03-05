import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import Student from '../models/student';
import Course from '../models/course';

export const AllStudents = (req: Request, res: Response, next: NextFunction) => {
  Student
    .find({}, { address: 0})
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const GetStudentById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Student
    .findById(id)
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
  const userId = req.params.id;
  let allCourses: any;

  Course.find()
    .sort({code: 1, section: 1})
    .exec()
    .then((courses) => 
    {
      allCourses = courses;

      return Student
        .findById(userId)
        .populate('courses');
    })
    .then((student) => {
      console.log(student);

      if (student === null)
        return res.status(400).json('Student not found');
      
      const response = {
        ...student.toObject(),
        allCourses
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const ChangeSectionByStudentId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const currentSection = req.body.current;
  const newSection = req.body.new;
  
  console.log('change', currentSection, newSection);
  Student
    .findByIdAndUpdate( userId,
      { $pull: { courses: currentSection} },
      { returnDocument: 'after' })
    .then((student) => {
      console.log(student);

      return Student.findByIdAndUpdate( userId,
        { $push: { courses: newSection} },
        { returnDocument: 'after' });
    })
    .then((student) => {
      console.log(student);

      return res.status(200).json(student);
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
  const userId = req.params.id;
  const courseId = new ObjectId(req.body.courseId);

  console.log(courseId);
  Student
    .findByIdAndUpdate( userId,
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
  const userId = req.params.id;
  const courseId = new ObjectId(req.body.courseId);

  console.log(courseId);
  Student
    .findByIdAndUpdate( userId,
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