import mongoose , { PassportLocalSchema }from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import Course from './course';

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentId: String,
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String,
  program: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
},
{
  collection: 'students'
});

StudentSchema.plugin(passportLocalMongoose, {
  usernameField: 'studentId',
  usernameQueryFields: ['studentId', 'email'],
  usernameLowerCase: true
});

const Model = mongoose.model('Student', StudentSchema as PassportLocalSchema);

declare global {
  export type StudentDocument = mongoose.Document & {
    studentId: string,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    program: string,
  }
}

export default Model;

// export type StudentDocumentWithAllCourses = StudentDocument & { allCourses: typeof(Course[]) }

export type LoggedUser = {
  userId: string
}