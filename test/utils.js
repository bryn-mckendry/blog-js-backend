import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import db from '../src/database';
import { SECRET_KEY } from '../config';
import app from '../src/app';
import { Profile } from '../src/profiles';

export const initDB = async done => {
    await db.sync({ force: true });
    done();
}

export const profileData = {
    username: 'foobar',
    email:'foo@bar.com',
    password: 'barfoo'
}

export const postData = {
    title: 'Test Post',
    content: 'Some content.'
}

export async function setup() {
    // Create user profile to be deleted.
    let profile = await Profile.create(profileData);
    let post = await profile.createPost(postData);
    // Set authorization header.
    let authHeader = createAuthHeader(profile);
    let request = () => supertest(app);
    return { profile, authHeader, request, post }
}

export const createAuthHeader = profile => ['Authorization', `Bearer ${jwt.sign({ id: profile.id }, SECRET_KEY)}`];