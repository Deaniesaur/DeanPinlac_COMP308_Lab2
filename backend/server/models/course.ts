import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: String,
  name: String,
  section: String,
  semester: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
},
{
  collection: 'courses'
});

CourseSchema.index({ code: 1, semester: 1, section: 1}, {unique: true});

const Model = mongoose.model('Course', CourseSchema);

export default Model;