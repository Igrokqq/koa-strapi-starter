const ValidationException = require('../validation.exception');
const ConflictException = require('../conflict.exception');

module.exports = async (ctx, next) => {
  try {
    global.user = ctx.state.user;

    await next();
  } catch (error) {
    if (error instanceof ConflictException) {
      ctx.status = 409;
      ctx.flash = {
        errors: [error.message],
      };
      ctx.redirect('back');
    } else if (error instanceof ValidationException) {
      ctx.status = 422;
      ctx.flash = {
        errors: error.details || [error.message.toString()],
      };
      ctx.redirect('back');
    } else {
      ctx.status = error.statusCode || error.status || 500;
    }

    ctx.body = {
      message: error.message,
      details: error.details,
    };
  }
};
