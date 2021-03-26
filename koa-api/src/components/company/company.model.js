const { Schema } = require('mongoose');

const CompanySchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        logo: {
            type: String,
            trim: true,
            required: true,
            default: null
        }
    },
    {
        collection: 'companies',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        versionKey: false
    }
);

module.exports = global.databases.mongo.model('CompanyModel', CompanySchema);