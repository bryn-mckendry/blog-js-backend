import * as yup from 'yup';
import Profile from './models';

export const getProfileSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required()
});


let email = yup.string()
                .email()
                .test(
                    'unique-email',
                    'email is in use',
                    async (email, context) => {
                        if (email !== undefined)  {
                            return await Profile.findOne({ where: { email }}) === null ? true : false
                        }
                        return true;
                    }
                )

export const createProfileSchema = yup.object().shape({
    username: yup.string().required(),
    email: email.required(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match.').required()
});

export const updateProfileSchema = yup.object().shape({
    username: yup.string(),
    email,
    password: yup.string().required(),
    confirmPassword: yup.string()
                        .when('password', {
                            is: value => value !== undefined,
                            then: yup.string().oneOf(
                                [yup.ref('password')],
                                'confirmPassword must match password')
                                .required()
                        })
});