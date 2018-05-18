'use strict';
const Joi = require('joi');
const ErrorHandler = require('../handlers/errorHandler');

const contactListValidator = {
    config: {
        validate: {
            params: {
                env: Joi.string().min(2).max(10).required()
            },
            query: {
                name: Joi.string().min(1).max(500).required(),
                ownedBy: Joi.string().min(6).max(7).required(),
                contactType: Joi.string().valid('individual', 'corporate').optional()
            },
            headers: Joi.object({
                'x-request-id': Joi.string().guid().required()
            }).options({ allowUnknown: true }),
            failAction: ErrorHandler.apply_ODSAPI001
        }
    }
};

module.exports = contactListValidator;
