"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
}, {
    collection: 'courses'
});
CourseSchema.index({ code: 1, semester: 1, section: 1 }, { unique: true });
const Model = mongoose_1.default.model('Course', CourseSchema);
exports.default = Model;
