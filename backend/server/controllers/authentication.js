"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.SignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_1 = __importDefault(require("../models/student"));
const passport_1 = __importDefault(require("passport"));
const Config = __importStar(require("../config/config"));
const SignUp = (req, res, next) => {
    const password = req.body.password;
    const confirm = req.body.confirm;
    if (password !== confirm) {
        return res.status(400).json('Passwords do not match');
    }
    const newStudent = new student_1.default({
        studentId: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        program: req.body.program,
    });
    console.log(newStudent);
    student_1.default.register(newStudent, password, (err) => {
        if (err) {
            console.error('Error in Student Registration');
            if (err.name === 'UserExistsError') {
                return res.status(400).json('User already exists');
            }
            return res.status(500).json(err);
        }
        // Registration Success
        res.status(200).json(newStudent);
    });
};
exports.SignUp = SignUp;
const Login = (req, res, next) => {
    const studentId = req.body.studentId;
    const password = req.body.password;
    if (studentId === null || password === null) {
        return res.status(400).json('Incomplete Credentials');
    }
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(400).json(err);
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json('Invalid Credentials');
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user._id,
                studentId: user.username
            }, Config.Secret, { expiresIn: '2h' });
            return res.status(200).json({
                token: token
            });
        });
    })(req, res, next);
};
exports.Login = Login;
