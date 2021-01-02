import jwt from 'jsonwebtoken';

import { Profile } from '.';
import { SECRET_KEY } from '../../config';
import ApiError from '../errors';

/**
 * Validates the user based on the authorization header provided.
 * If user validates, sets the current profile to res.locals.profile
 * 
 * If token in auth header is invalid, return a 401 error. with 'bad token'
 * message.
 * 
 * If auth header doesn't exist, returns a 400 error and message indicating this.
 * 
 * @param {*} req Express request 
 * @param {*} res Express Response
 * @param {*} next Next express Middlewhere
 */
export async function accessProfile(req, res, next) { 
    if (req.headers.authorization === undefined) {
        return next(ApiError.badRequest(['missing authorization header']));
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const profile = await Profile.findByPk(decoded.id);
        if (profile === null) {
            return next(ApiError.notFound(['profile not found']));
        }
        res.locals.profile = profile;
        next();
    } catch (err) {
        console.log(err);
        next(ApiError.unauthorized(['invalid authorization header']));
    }
}