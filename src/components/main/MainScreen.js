import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPatients } from '../../redux/actions/patients';
import { getProcedures } from '../../redux/actions/procedures';
import { getProfessionals } from '../../redux/actions/professionals';
import { getUsers } from '../../redux/actions/users';

import { MainRouter } from '../../routes/MainRouter';
import { MainSidebar } from './MainSidebar';

export const MainScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatients());
        dispatch(getProcedures());
        dispatch(getProfessionals());
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <main className="container bg-orange min-vh-100 min-vw-100">
            <div className="row">
                <MainSidebar />
                <div className="col-md-12">
                    <MainRouter />
                </div>
            </div>
        </main>
    );
}
