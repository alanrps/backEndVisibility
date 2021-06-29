const Joi = require('joi');

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};

const locations = ['params', 'body', 'query', 'headers'];

export const requestValidator = schema => (request, response, next) => {
    if (schema) {
        const obj = {};

        locations.forEach(key => {
            if (schema[key]) {
                obj[key] = request[key];
            }
        });

        return Joi.validate(obj, schema, options, (err, data) => {
            if (err) {
                const errors = {};
                err.details.forEach(detail => {
                    errors[detail.context.key] = detail.message.replace(/['"]/g, '');
                });

                const errorMessage = {
                    request: request.body,
                    errors,
                };

                response.status(400).json(errorMessage);
            } else {
                locations.forEach(key => {
                    request[key] = data[key] || {};
                });
                next();
            }
        });
    }

    return next();
};

export default {};
