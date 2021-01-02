import * as yup from 'yup';


export const createPostSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
});

export const updatePostSchema = createPostSchema;

export const getPostSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    author: yup.string().required(),
    createdAt: yup.date().required()
});