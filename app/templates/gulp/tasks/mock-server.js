import eventStream from 'event-stream';
import Hapi        from 'hapi';
import watch       from 'gulp-watch';

var server;

function forceRequireFile (filepath) {
  if (require.cache[filepath]) {
    delete require.cache[filepath];
  }
  return require(filepath);
}

function read (file) {
  var fileContents = forceRequireFile(file.path);
  fileContents.map((endpoint) => {
    server.route({
      method: endpoint.method,
      path: endpoint.route,
      handler: (request, reply) => {
        setTimeout(() => {
          reply(endpoint.response(request)).code(endpoint.code);
        }, endpoint.timeout || 0);
      }
    });
  });
}

function end () {
  server.start(() => {
    gutil.log('Mock server running at:', server.info.uri);
  });
}

gulp.task('mock:routes', () => {
  server = new Hapi.Server();
  server.connection({ port: 8090 });
  gulp.src(`${config.PROJECT_ROOT}/mocks/**/*.js`)
  .pipe(eventStream.through(read, end));
});

gulp.task('mock', ['mock:routes'], () => {
  watch(`${config.PROJECT_ROOT}/mocks/**/*.js`, () => {
    gutil.log('Restarting Mock server');
    server.stop(() => {
      gulp.start('mock:routes');
    });
  });
});
