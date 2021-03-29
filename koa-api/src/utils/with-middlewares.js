module.exports = function (middlewares, handler) {
  return async function (ctx, ...params) {
    middlewares.forEach((middleware) => middleware(ctx));

    await handler(ctx, ...params);
  };
};
