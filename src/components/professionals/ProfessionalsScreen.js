import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfessionalsList } from './ProfessionalsList';
import { ProfessionalsRegister } from './ProfessionalsRegister';

export const ProfessionalsScreen = () => {

    const { data } = useSelector(state => state.professionals);
    const [professionals, setProfessionals] = useState(data);
    const [registerForm, setRegisterForm] = useState(false);

    useEffect(() => {
        setProfessionals(data);
    }, [data]);

    const showRegisterForm = () => {
        setRegisterForm(!registerForm);
    }

    return (
        <div className="container">
            <p className="fs-3 text-center mt-3">Profesionales</p>
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
                            ? 'Ocultar'
                            : 'Nuevo'
                    }
                </button>

                {
                    registerForm &&
                    <ProfessionalsRegister />
                }

            </div>
            <ProfessionalsList professionals={professionals} />
        </div>
    )
}
