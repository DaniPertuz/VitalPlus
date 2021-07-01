import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { updatePatient } from '../../redux/actions/patients';
import { uiCloseModal } from '../../redux/actions/modal';

const initPatient = {
    name: '',
    document: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    procedure: '',
    professional: '',
    transferred: false
}

export const PatientsModal = () => {

    const dispatch = useDispatch();

    const { data: proceduresDB } = useSelector(state => state.procedures);
    const { data: professionalsDB } = useSelector(state => state.professionals);
    const { modalDialog } = useSelector(state => state.modal);
    const { patient } = useSelector(state => state.patients);

    const [procedures,] = useState(proceduresDB)
    const [professionals,] = useState(professionalsDB);
    const [formValues, setFormValues] = useState(initPatient);

    const handleDate = () => {
        return moment.utc(dateOfBirth).format('YYYY-MM-DD');
    }

    useEffect(() => {
        if (patient) {
            setFormValues(patient);
        }
    }, [patient]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const { name, document, phone, address, dateOfBirth, procedure, professional, transferred } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (patient) {
            if (JSON.stringify(patient) !== JSON.stringify(formValues)) {
                dispatch(updatePatient({
                    ...formValues,
                    dateOfBirth: handleDate()
                }));
            } else {
                Swal.fire('Atención', 'Datos no fueron modificados', 'info');
            }
        }
        closeModal();
    }


    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    return (
        <Modal
            open={modalDialog}
            onClose={closeModal}
            center
        >
            <h2 className="mt-4">Actualización de datos</h2>
            <form
                className="container"
                onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="inputDocument"
                        className="form-label"
                    >
                        No. de documento
                    </label>
                    <input
                        id="inputDocument"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Documento"
                        onChange={handleInputChange}
                        name="document"
                        value={document}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="inputName"
                        className="form-label"
                    >
                        Nombre
                    </label>
                    <input
                        id="inputName"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        name="name"
                        value={name}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="inputAddress"
                        className="form-label"
                    >
                        Dirección
                    </label>
                    <input
                        id="inputAddress"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Dirección"
                        onChange={handleInputChange}
                        name="address"
                        value={address}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="inputPhone"
                        className="form-label"
                    >
                        Teléfono
                    </label>
                    <input
                        id="inputPhone"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Teléfono"
                        onChange={handleInputChange}
                        name="phone"
                        value={phone}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="comboProfessional"
                        className="form-label"
                    >
                        Profesional
                    </label>
                    <select
                        id="comboProfessional"
                        className="form-control"
                        onChange={handleInputChange}
                        name="professional"
                        value={professional}
                    >
                        {
                            professionals.map((professional, index) =>
                                <option key={index} value={professional._id}>{professional.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="comboProcedure"
                        className="form-label"
                    >
                        Tratamiento
                    </label>
                    <select
                        id="comboProcedure"
                        className="form-control"
                        onChange={handleInputChange}
                        name="procedure"
                        value={procedure}
                    >
                        {
                            procedures.map((procedure, index) =>
                                <option key={index} value={procedure._id}>{procedure.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="inputDateOfBirth"
                        className="form-label"
                    >
                        Fecha de nacimiento
                    </label>
                    <input
                        id="inputDateOfBirth"
                        type="date"
                        className="form-control"
                        placeholder="Fecha de nacimiento"
                        onChange={handleInputChange}
                        value={handleDate()}
                        name="dateOfBirth"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="comboTransferred"
                        className="form-label"
                    >
                        Remitido
                    </label>
                    <select
                        id="comboTransferred"
                        className="form-select"
                        onChange={handleInputChange}
                        name="transferred"
                        value={transferred}
                    >
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="mb-1">
                    <button
                        className="btn btn-primary"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    )
}
