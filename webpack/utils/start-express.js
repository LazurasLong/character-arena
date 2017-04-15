import childProcess from 'child_process';
import path from 'path';
import debug from 'debug';
import noop from 'lodash/noop';
import watch from 'node-watch';

const EXPRESS_PATH = path.join(__dirname, '../../src/server/index');

let server;

const startServer = () => {
  const restartServer = () => {
    debug('dev')('restarting server application');
    server.kill('SIGTERM');
    return startServer(true);
  };

  const env = {
    ...process.env,
    NODE_ENV: 'development',
    BABEL_ENV: 'server',
  };

  server = childProcess.fork(EXPRESS_PATH, { env });

  server.once('message', (message) => {
    if (message !== 'online') return;

    // Listen for `rs` in stdin to restart server
    debug('dev')('type `rs` in console for restarting server application');
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
      const parsedData = `${data}`.trim().toLowerCase();
      if (parsedData === 'rs') restartServer();
    });

    // Start watcher on server files and reload browser on change
    watch(
      path.join(__dirname, '../../src/server'),
      file => !file.match('webpack-stats.json') ? restartServer() : noop(),
    );
  });
};

// Kill server on exit
process.on('exit', () => server.kill('SIGTERM'));

export default () => !server ? startServer() : noop();
