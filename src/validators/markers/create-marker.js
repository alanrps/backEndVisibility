import joi from 'joi';

export const schemaCreateMarker = {
    body: joi
        .object({
            marker: joi
                .object({
                    user_id: joi
                        .number()
                        .integer()
                        .positive()
                        .required(),
                    longitude: joi
                        .number()
                        .required(),
                    latitude: joi
                        .number()
                        .required(),
                }),
            type_marker: joi
                .string()
                .max(50)
                .required(),
            place: joi
                .object({
                    name: joi
                        .string()
                        .max(45)
                        .trim(),
                    classify: joi
                        .string()
                        .max(14)
                        .trim(),
                    details: joi
                        .string()
                        .max(7)
                        .trim(),
                    description: joi
                        .string()
                        .max(100)
                        .trim(),
                }),
        })
        .required(),
};

export default {};
