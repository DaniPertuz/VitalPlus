import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';

import { uiCloseModal } from '../../redux/actions/modal';
import { updateProfessional } from '../../redux/actions/professionals';

const initProfessional = {
    document: '',
    name: '',
    specialty: ''
}

export const ProfessionalsModal = () => {

    const dispatch = useDispatch();

    const { modalDialog } = useSelector(state => state.modal);
    const { professional } = useSelector(state => state.professionals);
    
    const [formValues, setFormValues] = useState(initProfessional);

    const { document, name, specialty } = formValues;

    useEffect(() => {
        if (professional) {
            setFormValues(professional);
        }
    }, [professional]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (professional) {
            dispatch(updateProfessional(formValues));
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
            <h2 className="mt-4">Actualización de profesional</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                    <label
                        htmlFor="inputDocument"
                        className="form-label">
                        No. de documento
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputDocument"
                        onChange={handleInputChange}
                        name="document"
                        autoComplete="off"
                        value={document}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputName"
                        className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        onChange={handleInputChange}
                        name="name"
                        autoComplete="off"
                        value={name}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputSpecialty"
                        className="form-label">
                        Especialidad
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputSpecialty"
                        onChange={handleInputChange}
                        name="specialty"
                        autoComplete="off"
                        value={specialty}
                    />
                </div>
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-success m-1">
                        Registrar
                    </button>
                </div>
            </form>
        </Modal>
    )
}
