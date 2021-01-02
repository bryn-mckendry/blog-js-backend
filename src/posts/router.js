import { Router } from 'express';

import { accessProfile } from '../profiles/middlewares';
import { accessPost } from './middlewares';
import { validateRequestBody } from '../utils';
import { createPostSchema, updatePostSchema, getPostSchema } from './schemas';
import { Post } from '.';
import { Profile } from '../profiles';
import ApiError from '../errors';

const router = Router();

router.get('/:id', async (req, res, next) => {
    const post = await Post.findByPk(req.params.id, { include: Profile });
    if (!post) return next(ApiError.notFound(['Post not found.']));
    return res.status(200).json(getPostSchema.cast({
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: post.profile.username
    }, { stripUnknown: true }));
});

router.delete('/:id', accessProfile, accessPost, async (req, res) => {
    await res.locals.post.destroy();
    return res.status(200).json({ message: 'Post deleted.' })
});

router.post('/', accessProfile, validateRequestBody(createPostSchema), async (req, res) => {
    const post = await res.locals.profile.createPost(req.body);
    return res.status(201).json(getPostSchema.cast({
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: res.locals.profile.username
    }, { stripUnknown: true }));
});

router.put('/:id', accessProfile, validateRequestBody(updatePostSchema), accessPost, async (req, res) => {
    const post = await res.locals.post.update(req.body);
    return res.status(200).json(getPostSchema.cast({
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        author: res.locals.profile.username
    }, { stripUnknown: true }));
});

export default router;