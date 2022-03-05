import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { DefaultPort, Secret } from '../config/config';
import { LoggedUser } from '../models/student';

export const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

export const onError = (error: createError.HttpError) => {
  const port = process.env.PORT || DefaultPort;

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': 
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
      break;
  }
};

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!;

  if (token === null)
    return res.status(403).json('Missing Token');

  jwt.verify(token, Secret, (err , decoded) => {
    if (err) {
      console.error(err.message);
      return res.status(401).json('Invalid Token');
    }

    const studentId = req.params.id;
    const loggedStudent = decoded as LoggedUser;
    console.log(studentId);
    console.log(loggedStudent);
    if(studentId !== undefined && studentId !== loggedStudent.userId)
      return res.status(401).json('Token Mismatch');
    
    next();
  });
};