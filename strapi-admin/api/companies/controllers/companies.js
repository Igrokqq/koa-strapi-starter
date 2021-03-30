'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find() {
    const companies = await strapi.query('companies').find();

    return companies.map((company) => sanitizeEntity(company, { model: strapi.models.companies }));
  }
};
