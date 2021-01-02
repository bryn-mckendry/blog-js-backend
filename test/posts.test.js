import { initDB, setup, postData } from './utils';
import { Post } from '../src/posts';

let authHeader;
let profile;
let request;
let post;

describe('Posts Endpoints', () => {
    beforeAll(async done => await initDB(done));


    describe('GET /post/:id', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request, post } = await setup());
            done();
        });

        it('should return the post info from the id.', async done => {
            const response = await request()
                                    .get(`/post/${post.id}`)
            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe(postData.title);
            expect(response.body.content).toBe(postData.content);
            expect(response.body.author).toBe(profile.username);
            expect(response.body.createdAt).not.toBe(null || undefined);
            done();
        });
    });

    describe('DELETE /post/:id', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request, post } = await setup());
            done();
        });

        it('should delete the post.', async done => {
            const resposne = await request()
                                    .delete(`/post/${post.id}`)
            expect(response.statusCode).toBe(200);
            const check = await Post.findByPk(post.id);
            expect(check).toBe(null);
            done();
        })
    })

    describe('POST /post', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request } = await setup());
            done();
        });

        it('should create a new post if valid data is provided and user is logged in.', async done => {
            const response = await request()
                                    .post('/post')
                                    .set(...authHeader)
                                    .send(postData);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(postData.title);
            expect(response.body.content).toBe(postData.content);
            expect(response.body.author).toBe(profile.username);
            expect(response.body.createdAt).not.toBe(null || undefined);
            done();
        })
    });

    describe('PUT /post/:id', () => {
        beforeAll(async done => {
            ({ authHeader, profile, request, post } = await setup());
            done();
        });

        it('should update the post with the new data.', async done => {
            let newData = {
                title: 'New Title',
                content: 'new content'
            }
            const response = await request()
                                    .put(`/post/${post.id}`)
                                    .set(...authHeader)
                                    .send(newData)
            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe(newData.title);
            expect(response.body.content).toBe(newData.content);
            const check = await Post.findByPk(post.id);
            expect(check.title).toBe(newData.title);
            expect(check.content).toBe(newData.content);
            done();
        });
    });
});
