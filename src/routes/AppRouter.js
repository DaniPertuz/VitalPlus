import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { startChecking } from '../redux/actions/auth';

import { LoginScreen } from '../components/login/LoginScreen';
import { MainScreen } from '../components/main/MainScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return (<h5>Cargando...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!user}
                    />
                    <PrivateRoute
                        path="/"
                        component={MainScreen}
                        isAuthenticated={!!user}
                    />
                </Switch>
            </div>
        </Router>
    )
}
