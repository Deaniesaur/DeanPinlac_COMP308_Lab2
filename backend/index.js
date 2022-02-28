"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./server/config/config");
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const index_1 = require("./server/utils/index");
const app_1 = __importDefault(require("./server/config/app"));
debug_1.default('deanpinlac-comp308-lab2-backend');
const port = index_1.normalizePort(process.env.PORT || config_1.DefaultPort);
console.log('port', port);
app_1.default.set('port', port);
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    debug_1.default('Listening on ' + bind);
};
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on('error', index_1.onError);
server.on('listening', onListening);
