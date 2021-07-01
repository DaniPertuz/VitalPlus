import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../redux/actions/modal';
import { getProcedure, deleteProcedure } from '../../redux/actions/procedures';
import { ProceduresModal } from './ProceduresModal';

export const ProcedureItem = ({ _id, name, value, type, description }) => {

    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(uiOpenModal());
        dispatch(getProcedure(_id));
    }

    const handleDelete = () => {
        dispatch(getProcedure(_id));
        dispatch(deleteProcedure(_id, name));
    }

    return (
        <div className="card mb-3">
            <div className="card-header">{name}</div>
            <div className="card-body">
                <p className="card-text">{value}</p>
                <p className="card-text">{type}</p>
                <p className="card-text">{description}</p>
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
            <ProceduresModal />
        </div>
    )
}
