/* eslint-disable no-param-reassign */
const { Types, Schema } = require('mongoose');
const { collectionName, modelName } = require('./project.constants');

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    company: {
      type: Types.ObjectId,
      required: true,
    },
    published_at: {
      type: Date,
      required: false,
      default: null,
      select: false,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    collection: collectionName,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);

module.exports = global.databases.mongo.model(modelName, ProjectSchema);
