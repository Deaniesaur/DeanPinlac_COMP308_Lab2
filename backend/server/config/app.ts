import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import * as Config from './config';
import studentRoute from '../routes/student';
import coursesRoute from '../routes/course';
import authRoute from '../routes/authentication';
import Student from '../models/student';

// App Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
export default app;

// DB Configuration
mongoose.connect(Config.MongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log(`Connected to MongoDB at ${Config.Host}`);
});

// Setup Express Session
app.use(session({
  secret: Config.Secret,
  saveUninitialized: false,
  resave: false
}));

// Authentication using Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(Student.createStrategy());
passport.serializeUser(Student.serializeUser() as any);
passport.deserializeUser(Student.deserializeUser());

// Routing
app.use('/students', studentRoute);
app.use('/courses', coursesRoute);
app.use('/', authRoute);