const { ObjectID } = require('mongodb');

module.exports = {
  toObjectID(value) {
    if (ObjectID.isValid(value)) {
      return value;
    }

    return new ObjectID(value);
  },
  withMiddlewares(middlewares, handler) {
    return async function (ctx, ...params) {
      const next = params.pop();
      await Promise.all(middlewares.map((middleware) => middleware(ctx, next)));
      await handler(ctx, ...params);
    };
  },
  isValidObjectID(value) {
    try {
      return ObjectID.isValid(value);
    } catch (error) {
      return false;
    }
  },
};
