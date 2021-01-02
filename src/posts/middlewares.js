import ApiError from '../errors';
import { Post } from './';


export async function accessPost(req, res, next) {
    const post = await Post.findByPk(req.params.id);
    if (!post) return next(ApiError.notFound(['Post not found.']));
    if (post.profileId !== res.locals.profile.id) return next(ApiError.unauthorized(['Unauthorized post access.']));
    res.locals.post = post;
    next();
}