const Joi = require('joi');
const plugins = require('./plugins');

const _getExtendedWithPlugins = function (Joi, plugins) {
  return plugins.reduce((customJoi, plugin) => customJoi.extend(plugin), Joi);
};
module.exports = _getExtendedWithPlugins(Joi, plugins);
