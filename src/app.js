import express, { json } from 'express';

import { apiErrorHandler } from './errors';
import { Profile, profileRouter } from './profiles';
import { Post, postRouter } from './posts';

const app = express();

app.use(json());

app.use('/profile', profileRouter); // Routing config
app.use('/post', postRouter);

app.use(apiErrorHandler); // Error handling

// Sequelize associations.
Profile.hasMany(Post);
Post.belongsTo(Profile);

export default app;
