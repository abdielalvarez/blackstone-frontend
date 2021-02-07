import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../layouts/home';
import Navbar from '../components/Navbar';
import SignUpView from '../layouts/signUp';
import TaskView from '../layouts/tasks';

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/add'} component={TaskView} />
                    <Route exact path={'/edit/:id'} component={TaskView} />
                    <Route exact path={'/sign-up'} component={SignUpView} />
                    <Route exact path={'/sign-in'} component={SignUpView} />
                    <Route exact path={'/sign-in'} component={Home} />
                    <Route component={SignUpView} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default AppRoutes;
