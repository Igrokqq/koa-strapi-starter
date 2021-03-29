const { Types, Schema } = require('mongoose');
const { collectionName, modelName } = require('./student.constants');

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    surname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    company: {
      type: Types.ObjectId,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
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

module.exports = global.databases.mongo.model(modelName, StudentSchema);
