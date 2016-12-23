import app from "./app";
import * as Debug from "debug";
import * as http from "http";

const debug = Debug('express-ts:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize port number
 * @param {number|string} val port number
 * @returns {number} normalized port number
 */
function normalizePort(val: (string|number)) {
    let port: number;

    if (typeof val === 'string') {
        port = parseInt(val, 10);
    }
    port = Math.round(port);

    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return 0;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') throw error;

    const bind = ((typeof port === 'string') ? 'Pipe ' : 'Port ') + port;

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
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
