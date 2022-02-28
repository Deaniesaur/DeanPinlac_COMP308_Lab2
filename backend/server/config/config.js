"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPort = exports.MongoURI = exports.Host = exports.Secret = void 0;
// DB Configuration
const database = 'db_student_registration';
const remoteHost = 'cluster0.ap5xt.mongodb.net';
// const LocalURI = `mongodb://localhost:27017/${database}`;
const RemoteURI = `mongodb+srv://admin:admin@${remoteHost}/${database}?retryWrites=true&w=majority`;
exports.Secret = 'someSecret';
exports.Host = remoteHost;
// export const MongoURI = LocalURI;
exports.MongoURI = RemoteURI;
// App Configuration
exports.DefaultPort = '8080';
