import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PatientsList } from './PatientsList';
import { PatientsRegister } from './PatientsRegister';

export const PatientsScreen = () => {

    const { data } = useSelector(state => state.patients);

    const [patients, setPatients] = useState(data);
    const [registerForm, setRegisterForm] = useState(false);

    useEffect(() => {
        setPatients(data);
    }, [data]);

    const showRegisterForm = () => {
        setRegisterForm(!registerForm);
    }

    return (
        <div className="container">
            <p className="fs-3 text-center mt-3">Pacientes</p>
            <hr />
            <div className="container">
                <button
                    onClick={showRegisterForm}
                    className={
                        registerForm
                            ? "btn btn-danger"
                            : "btn btn-primary"
                    }>
                    {
                        registerForm
                            ? 'Cancelar'
                            : 'Nuevo'
                    }
                </button>
                {
                    registerForm &&
                    <PatientsRegister />
                }
            </div>
            <PatientsList patients={patients} />
        </div>
    )
}
