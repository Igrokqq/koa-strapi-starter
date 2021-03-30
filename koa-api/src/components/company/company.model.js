const { Schema } = require('mongoose');

const CompanySchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      trim: true,
      required: true,
      default: null,
    },
    published_at: {
      type: Date,
      required: false,
      default: null,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    collection: 'companies',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);

module.exports = global.databases.mongo.model('CompanyModel', CompanySchema);
