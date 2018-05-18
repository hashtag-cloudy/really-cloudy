'use strict';
const Joi = require('joi');
const ErrorHandler = require('../handlers/errorHandler');

const contactByIdValidator = {
    config: {
        validate: {
            params: {
                env: Joi.string().min(2).max(10).required()
            },
            query: {
                odsPhysicalPrimaryKey: Joi.number().integer().min(0).required()
            },
            headers: Joi.object({
                'x-request-id': Joi.string().guid().required()
            }).options({ allowUnknown: true }),
            failAction: ErrorHandler.apply_ODSAPI001
        }
    }
};

module.exports = contactByIdValidator;
