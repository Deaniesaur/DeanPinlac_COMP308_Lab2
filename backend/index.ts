import { DefaultPort } from './server/config/config';
import debug from 'debug';
import http from 'http';
import { normalizePort, onError } from './server/utils/index';
import app from './server/config/app';

debug('deanpinlac-comp308-lab2-backend');

const port = normalizePort(process.env.PORT || DefaultPort);
console.log('port', port);
app.set('port', port);

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
};

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);