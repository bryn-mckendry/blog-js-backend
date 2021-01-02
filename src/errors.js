

const generateError = (code, errors) => new ApiError(code, { errors });

export default class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(messages) {
        return generateError(400, messages);
    }

    static notFound(messages) {
        return generateError(404, messages);
    }

    static unauthorized(messages) {
        return generateError(401, messages);
    }
}

/**
 * Error Handler middleware.
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function apiErrorHandler (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.code).json(err.message);
    }
    return res.status(500).json({ message: 'Somethin went wrong.' });
}
