const router = require('koa-route'); // @todo replace by koa-router library
const koaPassport = require('koa-passport');
const authConstants = require('../components/auth/auth.constants');
const onlyAuthenticatedGuard = require('../components/auth/guards/only-authenticated.guard');
const onlyUnauthenticatedGuard = require('../components/auth/guards/only-unauthenticated.guard');
const { withMiddlewares } = require('../shared/util.service');
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
const RelationStudentToProjectController = () => require('../components/relation-student-to-project/relation-student-to-project.controller');

const Router = {
  init(app) {
    const homeController = HomeController();
    const companyController = CompanyController();
    const studentController = StudentController();
    const projectController = ProjectController();
    const authController = AuthController();
    const relationStudentToProjectController = RelationStudentToProjectController();

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
    app.use(router.get('/login', withMiddlewares([onlyUnauthenticatedGuard], authController.signInPage)));
    app.use(router.get('/sign-up', withMiddlewares([onlyUnauthenticatedGuard], authController.signUpPage)));
    app.use(router.post('/sign-up', withMiddlewares([onlyUnauthenticatedGuard], authController.signUp)));
    app.use(router.get('/logout', withMiddlewares([onlyAuthenticatedGuard], authController.logout)));
    /**
     * @description Companies
     */
    app.use(router.post('/companies', withMiddlewares([onlyAuthenticatedGuard], companyController.create)));
    /**
     * @description Students
     */
    app.use(router.post('/students', withMiddlewares([onlyAuthenticatedGuard], studentController.create)));
    app.use(router.get('/students/company/:companyId', withMiddlewares([onlyAuthenticatedGuard], studentController.getAllByCompany)));
    app.use(router.get('/students/admins/company/:companyId', withMiddlewares([onlyAuthenticatedGuard], studentController.getCompanyAdmins)));
    app.use(router.get('/students/simple/company/:companyId', withMiddlewares([onlyAuthenticatedGuard], studentController.getCompanySimpleStudents)));
    /**
     * @description Projects
     */
    app.use(router.post('/projects', projectController.create));
    app.use(router.get('/projects/:companyId', projectController.getAllByCompany));
    app.use(router.post('/projects/join', relationStudentToProjectController.create));
    /**
     * @description Student Profile
     */
    app.use(router.get('/profile', withMiddlewares([onlyAuthenticatedGuard], studentController.profilePage)));
    app.use(router.get('/profile/company/details', withMiddlewares([onlyAuthenticatedGuard], studentController.profileCompanyDetailsPage)));
  },
};
module.exports = Router;
