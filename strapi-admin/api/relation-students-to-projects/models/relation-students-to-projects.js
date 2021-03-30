'use strict';

const { ObjectID } = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    /**
     *
     * @description triggered before relation student to project creation
     */
    async beforeCreate(data) {
      data.student = new ObjectID(data.student);
      data.project = new ObjectID(data.project);
      delete data.created_by;
      delete data.updated_by;

      const [project, student] = await Promise.all([
        strapi.query('projects').findOne({ _id: data.project }),
        strapi.query('students').findOne({ _id: data.student })
      ]);
      const projectCompanyId = project.company._id;
      const studentCompanyId = new ObjectID(student.company);

      /**
       * if project does belong to the same project to which student belong
       * then create else throw Error
       */
      if (projectCompanyId.equals(studentCompanyId)) {
        return;
      }

      throw new Error('student should belong to the same company to which project belong');
    }
  }
};
