require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const GlobalConstants = require('./config/global.constants');
const Router = require('./config/router');
const Middleware = require('./config/middleware');
/**
 * @description GlobalConstants should be inited mostly first 'cause he inits databases and other important global modules
 */
GlobalConstants.init();
/**
 * @description Middleware must be inited before Router 'cause he inits body parser and other important modules
 */
Middleware.init(app);
/**
 * @description Router inits routes pipeline
 */
Router.init(app);

app.listen(process.env.PORT || 4000);