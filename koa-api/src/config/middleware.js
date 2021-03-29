const koaBody = require('koa-body');
const koaSession = require('koa-session');
const serve = require('koa-static');
const { join } = require('path');
const allExceptionsFilter = require('../exceptions/filters/all-exceptions.filter');
const passport = require('../components/auth/passport')(require('koa-passport'));

const publicFolderPath = join(__dirname, '../', '../', 'public');

module.exports = {
  init(app) {
    app.use(koaBody({
      formidable: {
        uploadDir: join(publicFolderPath, 'uploads'), // directory where files will be uploaded
        keepExtensions: true, // keep file extension on upload
      },
      multipart: true,
      urlencoded: true,
    }));
    app.use(serve(publicFolderPath));
    /**
         * @description init koaSessions
         */
    app.keys = [process.env.SESSION_SECRET];
    app.use(koaSession({}, app));
    /**
         * @description init koaPassport
         */
    passport.init(app);
    /**
         * @description init all exceptions handler
         */
    app.use(allExceptionsFilter);
  },
};
