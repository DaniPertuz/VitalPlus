import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProcedureRegister } from './ProcedureRegister';
import { ProceduresList } from './ProceduresList';

export const ProceduresScreen = () => {

    const { data } = useSelector(state => state.procedures);
    const [procedures, setProcedures] = useState(data);
    
    useEffect(() => {
        setProcedures(data)
    }, [data]);

    const [registerForm, setRegisterForm] = useState(false);

    const showRegisterForm = () => {
        setRegisterForm(!registerForm);
    }

    return (
        <div className="container">
            <p className="fs-3 text-center mt-3">Tratamientos</p>
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
                    <ProcedureRegister />
                }
            </div>
            <ProceduresList procedures={procedures} />
        </div>
    )
}
