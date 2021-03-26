const CompanyRepository = require('./company.repository');
const fileService = require('../../shared/file.service');

module.exports = {
    async create({ logo, ...body }) {
       const company = await CompanyRepository.create({
           ...body,
           logo: fileService.getFullPath(fileService.getCorrectPath(logo.path))
       });

       return company;
    },
}