const localStrategy = require('./strategies/local.strategy');

const StudentService = () => require('../student/student.service');
const CompanyService = () => require('../company/company.service');

module.exports = function (koaPassport) {
  return {
    init(app) {
      const studentService = StudentService();
      const companyService = CompanyService();

      app.use(koaPassport.initialize());
      app.use(koaPassport.session());
      koaPassport.serializeUser((student, done) => {
        done(null, student);
      });
      koaPassport.deserializeUser(async ({ _id }, done) => {
        const student = await studentService.getById(_id);

        if (!student) {
          return done(null, false, {
            message: 'User does not exist',
          });
        }

        const studentCompany = await companyService.getById(student.company);

        return done(null, {
          ...student,
          company: studentCompany,
        });
      });
      koaPassport.use(localStrategy);
    },
  };
};
