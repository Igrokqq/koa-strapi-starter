const UtilService = require('../../shared/util.service');
const StudentModel = require('./student.model');

module.exports = {
    create(body) {
        return StudentModel.create({
            ...body,
            company: UtilService.toObjectID(body.company)
        });
    },

    getAllByCompany({ companyId }) {
            company: UtilService.toObjectID(companyId)
        }).exec();
    },

    getCompanyAdmins({ companyId }) {
        return StudentModel.find({
            company: UtilService.toObjectID(companyId),
            isAdmin: true
        }).exec();
    },

    getCompanySimpleStudents({ companyId }) {
        return StudentModel.find({
            company: UtilService.toObjectID(companyId),
            isAdmin: false
        }).exec();
    },

    getByEmail(email) {
        return StudentModel.findOne({
            email
        }).exec();
    }
}