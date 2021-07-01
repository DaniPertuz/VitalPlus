import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { useDispatch } from 'react-redux';
import { deletePatient, getPatient } from '../../redux/actions/patients';
import { PatientsModal } from './PatientsModal';
import { uiOpenModal } from '../../redux/actions/modal';

moment.locale('es');
export const PatientsItem = ({
    _id,
    name,
    document,
    phone,
    address,
    dateOfBirth,
    procedure,
    professional,
    transferred
}) => {

    const dispatch = useDispatch();

    const handleDate = () => {
        return moment.utc(dateOfBirth).format('MMMM D, YYYY');
    }

    const handleTransferred = () => {
        return (transferred) ? 'Remitido' : 'No remitido';
    }

    const handleUpdate = () => {
        dispatch(uiOpenModal());
        dispatch(getPatient(document));
    }

    const handleDelete = () => {
        dispatch(getPatient(document));
        dispatch(deletePatient(_id, name));
    }

    return (
        <div className="card mb-3">
            <div className="card-header">{name}</div>
            <div className="card-body">
                <p className="card-text text-capitalize px-2">
                    Documento: {document}
                    <br />
                    Nacimiento: {handleDate()}
                    <br />
                    Dirección: {address}
                    <br />
                    Teléfono: {phone}
                    <br />
                    Tratamiento: {procedure.name}
                    <br />
                    Profesional: {professional.name}
                    <br />
                    {handleTransferred()}
                </p>
            </div>
            <div className="card-footer text-end">
                <button
                    className="m-1 btn btn-warning"
                    onClick={handleUpdate}
                >
                    Actualizar
                </button>
                <button
                    className="m-1 btn btn-danger"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            </div>
            <PatientsModal key={_id} />
        </div>
    )
}
