const localStrategy = require('./strategies/local.strategy');

const StudentService = () => require('../student/student.service');

module.exports = function (koaPassport) {
  return {
    init(app) {
      const studentService = StudentService();

      app.use(koaPassport.initialize());
      app.use(koaPassport.session());
      koaPassport.serializeUser((user, done) => {
        done(null, user);
      });
      koaPassport.deserializeUser(async ({ _id }, done) => {
        const user = await studentService.getById(_id);

        if (!user) {
          return done(null, false, {
            message: 'User does not exist',
          });
        }

        return done(null, user);
      });
      koaPassport.use(localStrategy);
    },
  };
};
