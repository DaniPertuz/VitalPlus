import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PatientsScreen } from '../components/patients/PatientsScreen';
import { PaymentsScreen } from '../components/payments/PaymentsScreen';
import { ProceduresScreen } from '../components/procedures/ProceduresScreen';
import { ProfessionalsScreen } from '../components/professionals/ProfessionalsScreen';
import { ReportsScreen } from '../components/search/ReportsScreen';
import { UsersScreen } from '../components/users/UsersScreen';

export const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact path="/"
                    component={PaymentsScreen} />
                <Route
                    exact path="/patients"
                    component={PatientsScreen} />
                <Route
                    exact path="/professionals"
                    component={ProfessionalsScreen} />
                <Route
                    exact path="/procedures"
                    component={ProceduresScreen} />
                <Route
                    exact path="/reports"
                    component={ReportsScreen} />
                <Route
                    exact path="/users"
                    component={UsersScreen} />
                <Route path="*" component={PaymentsScreen} />
            </Switch>
        </Router>
    )
}
