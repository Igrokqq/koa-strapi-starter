const ValidationException = require('../../exceptions/validation.exception');
const companyCreateDto = require('./dto/company-create.dto');
const CompanyService = require('./company.service');

module.exports = {
    async create(ctx) {
       const body = {
         ...ctx.request.body,
         logo: ctx.request.files.logo
        };
       const { error } = companyCreateDto.isValid(body);

       if (error) {
           throw new ValidationException(error);
       }

       ctx.response.body = await CompanyService.create(body);
    }
}