const router = require('koa-route');
const koaPassport = require('koa-passport');
const authConstants = require('../components/auth/auth.constants');
const onlyAuthenticatedGuard = require('../components/auth/guards/only-authenticated.guard.js');
const withMiddlewares = require('../utils/with-middlewares');
/**
 *
 * Every controller should be lazy because when we load him he pull
 * his module dependencies like service, repository, model and connection
 */
const HomeController = () => require('../components/home/home.controller');
const CompanyController = () => require('../components/company/company.controller');
const StudentController = () => require('../components/student/student.controller');
const ProjectController = () => require('../components/project/project.controller');
const AuthController = () => require('../components/auth/auth.controller');

const Router = {
  init(app) {
    const homeController = HomeController();
    const companyController = CompanyController();
    const studentController = StudentController();
    const projectController = ProjectController();
    const authController = AuthController();

    /**
     * @description Home
     */
    app.use(router.get('/', withMiddlewares([onlyAuthenticatedGuard], homeController.index)));
    app.use(router.get('/ping', homeController.ping));
    /**
     * @description PassportLocalAuth
     */
    app.use(router.post('/login', koaPassport.authenticate(authConstants.TYPES.LOCAL, {
      successRedirect: '/',
      failureRedirect: '/login',
    })));
    app.use(router.get('/login', authController.signInPage));
    app.use(router.get('/sign-up', authController.signUpPage));
    app.use(router.post('/sign-up', authController.signUp));
    /**
     * @description Companies
     */
    app.use(router.post('/companies', companyController.create));
    /**
     * @description Students
     */
    app.use(router.post('/students', studentController.create));
    app.use(router.get('/students/company/:companyId', studentController.getAllByCompany));
    app.use(router.get('/students/admins/company/:companyId', studentController.getCompanyAdmins));
    app.use(router.get('/students/simple/company/:companyId', studentController.getCompanySimpleStudents));
    /**
     * @description Projects
     */
    app.use(router.post('/projects', projectController.create));
  },
};
module.exports = Router;
