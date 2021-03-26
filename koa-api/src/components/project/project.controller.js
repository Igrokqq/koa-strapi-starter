const ValidationException = require("../../exceptions/validation.exception");
const createProjectDto = require('./dto/create.dto');
const ProjectService = require('./project.service');

module.exports = {
    async create(ctx) {
        const { error } = createProjectDto.isValid(ctx.request.body);

        if (error) {
            throw new ValidationException(error);
        }

        ctx.response.body = await ProjectService.create(ctx.request.body);
    }
}