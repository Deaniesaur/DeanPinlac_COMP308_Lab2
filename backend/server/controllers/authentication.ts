import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/student';
import passport from 'passport';
import * as Config from '../config/config';

export const SignUp = (req: Request, res: Response, next: NextFunction) => {
  const password = req.body.password;
  const confirm = req.body.confirm;

  if (password !== confirm){
    return res.status(400).json('Passwords do not match');
  }

  const newStudent = new Student({
    studentId: req.body.studentId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    program: req.body.program,
  });

  console.log(newStudent);

  Student.register(newStudent, password, (err) => {
    if (err){
      console.error('Error in Student Registration');
      if(err.name === 'UserExistsError'){
        return res.status(400).json('User already exists');
      }

      return res.status(500).json(err);
    }

    // Registration Success
    res.status(200).json(newStudent as StudentDocument);
  });
};

export const Login = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.body.studentId;
  const password = req.body.password;

  if (studentId === null || password === null) {
    return res.status(400).json('Incomplete Credentials');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(400).json(err);
    }

    req.login(user, (err) => {
      if(err) {
        console.error(err);
        return res.status(400).json('Invalid Credentials');
      }

      const token = jwt.sign({
        userId: user._id,
        studentId: user.username
      }, Config.Secret, {expiresIn: '2h'});

      return res.status(200).json({
        token: token
      });
    });
  })(req, res, next);
};