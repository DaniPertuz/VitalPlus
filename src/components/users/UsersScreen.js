import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UsersList } from './UsersList';
import { UsersRegister } from './UsersRegister';

export const UsersScreen = () => {

    const [registerForm, setRegisterForm] = useState(false);

    const { data } = useSelector(state => state.users);

    const [users, setUsers] = useState(data);

    useEffect(() => {
        setUsers(data);
    }, [data]);

    const showRegisterForm = () => {
        setRegisterForm(!registerForm);
    }

    return (
        <div className="container">
            <h3 className="text-center mt-3">Usuarios</h3>
            <hr />
            <div className="row">
                <div className="col-md-12">
                    <button
                        onClick={showRegisterForm}
                        className={
                            registerForm
                                ? "btn btn-danger"
                                : "btn btn-primary"
                        }
                    >
                        {
                            registerForm
                                ? 'Ocultar'
                                : 'Nuevo'
                        }
                    </button>
                    {
                        registerForm &&
                        <UsersRegister />
                    }
                </div>
                <div className="col-md-6 offset-md-3">
                    <UsersList users={users} />
                </div>
            </div>
        </div>
    )
}
