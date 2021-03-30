'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find() {
    const projects = await strapi.query('projects').find();

    return projects.map((project) => sanitizeEntity(project, { model: strapi.models.projects }));
  },
};
