import { Router } from 'express';

import { accessProfile } from './middlewares';
import { getProfileSchema, createProfileSchema, updateProfileSchema } from './schemas';
import { validateRequestBody } from '../utils';
import Profile from './models';


const router = Router();

router.delete('/', accessProfile, async (req, res) => {
    await res.locals.profile.destroy();
    return res.status(200).json({ message: 'profile deleted' });
});

router.get('/', accessProfile, (req, res) => {
    return res.status(200).json(getProfileSchema.cast(res.locals.profile, { stripUnknown: true }));
});

router.post('/', validateRequestBody(createProfileSchema), async (req, res, next) => {
    const profile = await Profile.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    return res.status(201).json(getProfileSchema.cast(profile, { stripUnknown: true }));
});

router.put('/', validateRequestBody(updateProfileSchema), accessProfile, async (req, res, next) => {
    const profile = await res.locals.profile.update(req.body);
    return res.status(200).json(getProfileSchema.cast(profile, { stripUnknown: true }));
});

export default router;