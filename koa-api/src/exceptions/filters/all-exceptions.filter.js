module.exports = async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      ctx.status = error.statusCode || error.status || 500;
      ctx.body = {
        message: error.message,
        details: error.details
      };
    }
};