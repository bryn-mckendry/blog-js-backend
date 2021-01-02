/**
 * Test suite for profile endpoints.
 */
import { initDB, setup, profileData } from './utils';
import { Profile } from '../src/profiles';

let authHeader;
let profile;
let request;

describe('Profiles Endpoints', () => {

    beforeAll(async done => await initDB(done));

    describe('DELETE /profile', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request } = await setup());
            done();
        });

        it('should delete the profile if the user is authenticated.', async done => {
            const response = await request().delete(`/profile`).set(...authHeader);
            const check = await Profile.findByPk(profile.id);
            expect(response.statusCode).toBe(200);
            expect(check).toBe(null);
            done();
        });
    });

    describe('GET /profile', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request } = await setup());
            done();
        });
        
        it('should return the current user\'s profile', async done => {
            const response = await request().get('/profile').set(...authHeader);
            expect(response.statusCode).toBe(200);
            expect(response.body.username).toBe(profileData.username);
            expect(response.body.email).toBe(profileData.email);
            expect(response.body.password).toBe(undefined);
            done();
        });
    });

    describe('POST /profile', () => {
        beforeAll(async done => {
            ({ request } = await setup());
            done();
        });

        it('should create a new profile if valid data is provided.', async done => {
            let createProfileData = {
                username: 'new_user',
                email: 'new_email@email.com',
                password: 'password',
                confirmPassword: 'password'
            }
            const response = await request()
                                    .post('/profile')
                                    .send(createProfileData);
            expect(response.statusCode).toBe(201);
            expect(response.body.username).toBe(createProfileData.username);
            expect(response.body.email).toBe(createProfileData.email);
            expect(response.body.password).toBe(undefined);
            done();
        });
    });
    
    describe('PUT /profile', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request } = await setup());
            done();
        });

        let updateData = {
            username: 'new',
            email: 'new@email.com',
            password: 'new_password',
            confirmPassword: 'new_password' 
        }
        it('should update the profile data if provided.', async done => {
            const response = await request()
                                    .put('/profile')
                                    .set(...authHeader)
                                    .send(updateData);
            expect(response.statusCode).toBe(200);
            await profile.reload();
            expect(profile.username).toBe(updateData.username);
            expect(profile.email).toBe(updateData.email);
            const passwordCheck = await profile.checkPassword(updateData.password);
            expect(passwordCheck).toBe(true);
            done();
        });
    });
});