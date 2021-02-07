import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { signInValidation, signUpValidation } from '../../utils/validations';
import { createUser, loginUser } from '../../store/actions/user';
import { useHistory, useLocation, Link } from 'react-router-dom';
import SignUpForm from '../../components/Forms/SignUpForm';
import SignInForm from '../../components/Forms/SignInForm';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0 0',
    },
    link: {
        color: '#27417c',
        textDecoration: 'none',
        '&:hover': {
            color: '#27417c',
            textDecoration: 'none',
        }
    }
});

const SignUp = ({
    createUser,
    loginUser,
    user
}) => {

    const history = useHistory()
    const location = useLocation()

    const [ loading, setLoading ] = useState(false)

    const classes = useStyles()

    const route = location.pathname && location.pathname.includes('sign-in') ? 'sign-in' : 'sign-up'

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [])

    const handleSignUp = async (values, { resetForm, setFieldError, setSubmitting }) => {
        setSubmitting(false);
        setLoading(true)
        const { name, email, password, confirmPassword } = values;
        if (password === confirmPassword) {
            const body = {
                name,
                email,
                password
            }
            try {
                await createUser(body)
                resetForm()
                setLoading(false)
                history.push('/sign-in')
            } catch (error) {
                console.log('error sign up', error);
                if (error === 'Contraseña incorrecta') {
                    setFieldError(
                        'password',
                        error === 'Contraseña incorrecta' ?
                        'Incorrect email or password' : 'An error ocurred'
                    );
                } else {
                    setFieldError('email', error);
                }
            }
        } else {
            setFieldError(
                'confirmPassword',
                'Password and confirm password do not match'
            );
        }
        setLoading(false)
        setSubmitting(true);
    }

    const handleSignIn = async (values, { resetForm, setFieldError, setSubmitting }) => {
        setSubmitting(false);
        setLoading(true)
        const { email, password } = values;
        const body = {
            email,
            password
        }
        try {
            await loginUser(body)
            resetForm()
            setLoading(false)
            history.push('/')
        } catch (error) {
            setFieldError(
                'password',
                'Probably user or password is incorrect'
            );
        }
        setLoading(false)
        setSubmitting(true);
    }

    const initialSignUpValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const initialSignInValues = {
        email: '',
        password: '',
    }

    return (
        <>
            <div className={classes.container}>
                <Typography variant="h3" component="h4">
                    {route === 'sign-up' ?
                        'Sign up here' : 'Sign in here'
                    }
                </Typography>

                {route === 'sign-up' ?
                    <Link className={classes.link} to="/sign-in">
                        If you have an account, sign in!
                    </Link> :
                    <Link className={classes.link} to="/sign-up">
                        If you don't have an account, sign up!
                    </Link>
                }
            </div>

            {route === 'sign-up' ?
                <Formik
                    initialValues={initialSignUpValues}
                    validationSchema={signUpValidation}
                    onSubmit={handleSignUp}
                >
                    {props => <SignUpForm {...props} loading={loading} />}
                </Formik> :
                <Formik
                    initialValues={initialSignInValues}
                    validationSchema={signInValidation}
                    onSubmit={handleSignIn}
                >
                    {props => <SignInForm {...props} loading={loading} />}
                </Formik>
            }
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null
})

const mapDispatchToProps = dispatch => ({
    createUser: body => dispatch(createUser(body)),
    loginUser: body => dispatch(loginUser(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
