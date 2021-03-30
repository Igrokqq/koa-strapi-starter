'use strict';

const { ObjectID } = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      data._id = new ObjectID(data._id);
      data.company = new ObjectID(data.company);
      delete data.created_by;
      delete data.updated_by;
    },
  },
};
