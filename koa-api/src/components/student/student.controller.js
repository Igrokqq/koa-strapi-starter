const ValidationException = require('../../exceptions/validation.exception');
const createStudentDto = require('./dto/create.dto');
const getAllByCompanyDto = require('./dto/get-all-by-company.dto');
const StudentService = require('./student.service');

module.exports = {
    async create(ctx) {
      const { error } = createStudentDto.isValid(ctx.request.body);

      if (error) {
         throw new ValidationException(error);
      }

      ctx.response.body = await StudentService.create(ctx.request.body);
    },

    async getAllByCompany(ctx, companyId) {
      const params = {
        companyId
      };
      const { error } = getAllByCompanyDto.isValid(params);

      if (error) {
        throw new ValidationException(error);
      }

      ctx.response.body = await StudentService.getAllByCompany(params);
    },

    async getCompanyAdmins(ctx, companyId) {
      const params = {
        companyId
      };
      const { error } = getAllByCompanyDto.isValid(params);

      if (error) {
        throw new ValidationException(error);
      }

      ctx.response.body = await StudentService.getCompanyAdmins(params);
    },

    async getCompanySimpleStudents(ctx, companyId) {
      const params = {
        companyId
      };
      const { error } = getAllByCompanyDto.isValid(params);

      if (error) {
        throw new ValidationException(error);
      }

      ctx.response.body = await StudentService.getCompanySimpleStudents(params);
    }
}