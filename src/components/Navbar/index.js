import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/user';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        }
    },
    brand: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        }
    }
});

const Navbar = ({
    logoutUser,
    user,
}) => {

    const history = useHistory()

    const handleLogout = () => {
        logoutUser()
        history.push('/sign-in')
    }

    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar classes={{ root: classes.container }}>
                <Link className={classes.brand} to={user ? "/" : "/sign-in"}>
                    <Typography variant="h6">
                        BLACKSTONE
                    </Typography>
                </Link>

                <div>
                    {user ?
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            className={classes.link}
                        >
                            Sign out
                        </Button> :
                        <>
                            <Link className={classes.link} to="/sign-up">
                                <Button
                                    color="inherit"
                                >
                                    Sign up
                                </Button>
                            </Link>
                            <Link className={classes.link} to="/sign-in">
                                <Button
                                    color="inherit"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
