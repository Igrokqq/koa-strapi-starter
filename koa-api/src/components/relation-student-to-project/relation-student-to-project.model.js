const { Types, Schema } = require('mongoose');
const { collectionName, modelName } = require('./relation-student-to-project.constants');

const ProjectSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      required: true,
    },
    project: {
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
