import React from 'react';
import { FaUserTie, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { getUser, deleteUser } from '../../redux/actions/users';
import { uiOpenModal } from '../../redux/actions/modal';
import { UsersModal } from './UsersModal';

export const UsersItem = ({ _id, name, email, username, role }) => {

    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(uiOpenModal());
        dispatch(getUser(email));
    }

    const handleDelete = () => {
        dispatch(getUser(email));
        dispatch(deleteUser(_id, name));
    }

    return (
        <div className="card mb-3">
            <div className="card-header">{name}</div>
            <div className="card-body">
                <p className="card-text">{username}</p>
                {role === "ADMIN"
                    ?
                    <p className="card-text fs-5 text-info">
                        <FaUserTie className="card-text fs-3 text-dark" />
                        &nbsp;Administrador
                    </p>
                    :
                    <p className="card-text fs-5 text-secondary">
                        <FaUser className="card-text fs-3 text-dark" />
                        &nbsp;Agente
                    </p>
                }
            </div>
            <div className="card-footer text-end">
                <button
                    className="card-link btn btn-warning"
                    onClick={handleUpdate}
                >
                    Actualizar
                </button>
                <button
                    className="card-link btn btn-danger"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            </div>
            <UsersModal />
        </div>
    )
}
