const koaBody = require('koa-body');
const koaSession = require('koa-session');
const koaEjs = require('koa-ejs');
const koaFlash = require('koa-flash');
const serve = require('koa-static');
const { join } = require('path');
const koaPassport = require('koa-passport');
const allExceptionsFilter = require('../exceptions/filters/all-exceptions.filter');
const passport = require('../components/auth/passport')(koaPassport);

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
    koaEjs(app, {
      root: join(__dirname, '../', 'views'),
      layout: 'layouts/base',
      viewExt: 'ejs',
      cache: false,
    });
    app.use(serve(publicFolderPath));
    /**
     * @description init koaSessions
     */
    // eslint-disable-next-line no-param-reassign
    app.keys = [process.env.SESSION_SECRET];
    app.use(koaSession({}, app));
    app.use(koaFlash({
      defaultValue: {
        errors: [],
      },
    }));
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
