const Joi = require('joi');
class validate {
    validateUser(user) {
        const userschema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            dept: Joi.number().integer(),
        });
        let result = userschema.validate(user);
        return result.error == null;
    }

    validateDepartment(dept) {
        const deptschema = Joi.object().keys({
            deptname: Joi.string().required()
        });
        let result = deptschema.validate(dept);
        return result.error == null;
    }

    validateProject(project) {
        const projectschema = Joi.object().keys({
            projectname: Joi.string().min(3).max(30).required()
        });
        let result = projectschema.validate(project);
        return result.error == null;
    }

    validateProjectAssign(prAssign) {
        const prassignschema = Joi.object().keys({
            projectId: Joi.number().integer().required(),
            userId: Joi.number().integer().required(),
        });
        let result = prassignschema.validate(prAssign);
        return result.error == null;
    }
}

module.exports = validate;