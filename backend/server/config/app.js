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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const Config = __importStar(require("./config"));
const student_1 = __importDefault(require("../routes/student"));
const course_1 = __importDefault(require("../routes/course"));
const authentication_1 = __importDefault(require("../routes/authentication"));
const student_2 = __importDefault(require("../models/student"));
// App Configuration
const app = express_1.default();
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(cors_1.default({ origin: '*' }));
exports.default = app;
// DB Configuration
mongoose_1.default.connect(Config.MongoURI);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(`Connected to MongoDB at ${Config.Host}`);
});
// Setup Express Session
app.use(express_session_1.default({
    secret: Config.Secret,
    saveUninitialized: false,
    resave: false
}));
// Authentication using Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(student_2.default.createStrategy());
passport_1.default.serializeUser(student_2.default.serializeUser());
passport_1.default.deserializeUser(student_2.default.deserializeUser());
// Routing
app.use('/students', student_1.default);
app.use('/courses', course_1.default);
app.use('/', authentication_1.default);
