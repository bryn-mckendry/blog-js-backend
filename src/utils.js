import ApiError from './errors';


/**
 * Generates a middleware to validate the request body against the provided schema.
 * Any failed validation causes the request to fail.
 * 
 * @param {yup.object} schema The schema to validate against. 
 */
export function validateRequestBody(schema) {
    return async (req, res, next) => {
        try {
            const validBody = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            req.body = validBody;
            next();
        } catch (err) {
            next(ApiError.badRequest(err.errors));
        }
    }
}