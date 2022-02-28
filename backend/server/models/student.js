"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const Schema = mongoose_1.default.Schema;
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
}, {
    collection: 'students'
});
StudentSchema.plugin(passport_local_mongoose_1.default, {
    usernameField: 'studentId',
    usernameQueryFields: ['studentId', 'email'],
    usernameLowerCase: true
});
const Model = mongoose_1.default.model('Student', StudentSchema);
exports.default = Model;
