import React from 'react';
import { useDispatch } from 'react-redux';

import { ProfessionalsModal } from './ProfessionalsModal';
import { deleteProfessional, getProfessional } from '../../redux/actions/professionals';
import { uiOpenModal } from '../../redux/actions/modal';

export const ProfessionalsItem = ({ _id, document, name, specialty }) => {

    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(uiOpenModal());
        dispatch(getProfessional(document));
    }

    const handleDelete = () => {
        dispatch(getProfessional(document));
        dispatch(deleteProfessional(_id, name));
    }

    return (
        <div className="card mb-3">
            <div className="card-header">{name}</div>
            <div className="card-body">
                <p className="card-text">{specialty}</p>
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
            <ProfessionalsModal />
        </div>
    )
}
