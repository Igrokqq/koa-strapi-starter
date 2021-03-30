'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find() {
    const students = await strapi.query('students').find();

    return students.map((student) => sanitizeEntity(student, { model: strapi.models.students }));
  }
};
