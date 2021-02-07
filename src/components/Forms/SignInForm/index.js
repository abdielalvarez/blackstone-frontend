import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles({
    TextField: {
        maxWidth: 768,
        width: '100%',
        height: 40,
        margin: '0 0 60px',
    },
    Button: {
        maxWidth: 768,
        width: '100%',
        height: 40,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30px 0 20px',
        '@media screen and (max-width: 768px)': {
            padding: '0 20px',
        }
    },
    loader: {
        width: 22,
        height: 22,
        display: 'flex',
        margin: '0 0 0 15px',
    }
});

function SignInForm({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
    loading,
}) {

    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className={classes.form}>
            <TextField
                label="Email*"
                type="email"
                id="email"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                classes={{ root: classes.TextField }}
                helperText={touched.email && errors.email ? errors.email : ''}
                error={touched.email && errors.email ? true : false}
            />

            <TextField
                label="Password*"
                id="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                helperText={
                    touched.password && errors.password ? errors.password : ''
                }
                classes={{ root: classes.TextField }}
                error={touched.password && errors.password ? true : false}
                fullWidth
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />

            <Button
                variant="contained"
                disabled={!isValid || loading}
                color="primary"
                type="submit"
                onClick={handleSubmit}
                classes={{ root: classes.Button }}
            >
                Sign in
                {loading ?
                    <div>
                        <CircularProgress classes={{ root: classes.loader }} color="secondary" />
                    </div> : null
                }
            </Button>
        </form>
    )
}

export default SignInForm;
