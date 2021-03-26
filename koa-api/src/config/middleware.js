const koaBody = require('koa-body');
const serve = require('koa-static');
const { join } = require('path');
const allExceptionsFilter = require('../exceptions/filters/all-exceptions.filter');

const publicFolderPath = join(__dirname, '../', '../', 'public');

module.exports = {
    init(app) {
        app.use(koaBody({
            formidable:{
                uploadDir: join(publicFolderPath, 'uploads'), // directory where files will be uploaded
                keepExtensions: true, // keep file extension on upload
            },
            multipart: true,
            urlencoded: true
        }));
        app.use(serve(publicFolderPath));
        app.use(allExceptionsFilter);
    }
}