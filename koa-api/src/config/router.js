const router = require('koa-route');
/**
 *
 * @description Every controller should be lazy because when we load him he pull his module dependencies like service, repository, model and connection
 */
const HomeController = () => require('../components/home/home.controller');
const CompanyController = () => require('../components/company/company.controller');
const StudentController = () => require('../components/student/student.controller');
const ProjectController = () => require('../components/project/project.controller');

const Router = {
    init(app) {
      const homeController = HomeController();
      const companyController = CompanyController();
      const studentController = StudentController();
      const projectController = ProjectController();

      app.use(router.get('/ping', homeController.ping));
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
    }
}
module.exports = Router;