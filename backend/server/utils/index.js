"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.onError = exports.normalizePort = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const normalizePort = (val) => {
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
exports.normalizePort = normalizePort;
const onError = (error) => {
    const port = process.env.PORT || config_1.DefaultPort;
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
exports.onError = onError;
const AuthGuard = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === null)
        return res.status(403).json('Missing Token');
    jsonwebtoken_1.default.verify(token, config_1.Secret, (err, decoded) => {
        if (err) {
            console.error(err.message);
            return res.status(401).json('Invalid Token');
        }
        const studentId = req.params.id;
        const loggedStudent = decoded;
        console.log(studentId);
        console.log(loggedStudent);
        if (studentId !== undefined && studentId !== loggedStudent.userId)
            return res.status(401).json('Token Mismatch');
        next();
    });
};
exports.AuthGuard = AuthGuard;
