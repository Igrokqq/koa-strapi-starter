const localStrategy = require('./strategies/local.strategy');

module.exports = function (koaPassport) {
  return {
    init(app) {
      app.use(koaPassport.initialize());
      app.use(koaPassport.session());
      koaPassport.serializeUser((user, done) => {
        console.log('serialize', user);
        done(null, user);
      });
      koaPassport.deserializeUser((user, done) => {
        console.log('deserialiaze', user);
        done(null, user);
      });
      koaPassport.use(localStrategy);
    },
  };
};
