import * as Yup from 'yup';

const requiredField = 'Required field';
const textAndAccents = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ ]*$/;
const minName = 'Very short name';
const maxName = 'Very large name';
const minEmail = 'Enter valid email';
const maxEmail = 'Enter smaller email';
const invalidEmail = 'Enter valid email';
const minPassword = 'Password must have at least 6 characters';
const maxPassword = 'Password must have less than 16 characters';

export const signUpValidation = Yup.object().shape({
    name: Yup.string()
        .min(3, minName)
        .max(60, maxName)
        .matches(textAndAccents, 'Only accept letters')
        .required(requiredField),
    email: Yup.string()
        .min(3, minEmail)
        .max(100, maxEmail)
        .email(invalidEmail)
        .required(requiredField),
    password: Yup.string()
        .min(6, minPassword)
        .max(16, maxPassword)
        .required(requiredField),
    confirmPassword: Yup.string()
        .min(6, minPassword)
        .max(16, maxPassword)
        .required(requiredField)
        .oneOf(
            [Yup.ref('password'), null],
            'password must match with confirm password'
        ),
});

export const signInValidation = Yup.object().shape({
    email: Yup.string()
        .min(3, minEmail)
        .max(100, maxEmail)
        .email(invalidEmail)
        .required(requiredField),
    password: Yup.string()
        .min(6, minPassword)
        .max(16, maxPassword)
        .required(requiredField),
});

export const taskValidation = Yup.object().shape({
    name: Yup.string()
        .min(3, minName)
        .max(50, maxName)
        .required(requiredField),
    content: Yup.string()
        .min(3, minName)
        .max(200, maxName)
        .required(requiredField),
});