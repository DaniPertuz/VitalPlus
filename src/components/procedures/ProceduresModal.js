import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../redux/actions/modal';
import { updateProcedure } from '../../redux/actions/procedures';

const initProcedure = {
    name: '',
    value: '',
    type: '',
    description: ''
}

export const ProceduresModal = () => {

    const dispatch = useDispatch();

    const { modalDialog } = useSelector(state => state.modal);
    const { procedure } = useSelector(state => state.procedures);

    const [formValues, setFormValues] = useState(initProcedure);

    const { name, value, type, description } = formValues;

    useEffect(() => {
        if (procedure) {
            setFormValues(procedure);
        }
    }, [procedure]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (procedure) {
            if(JSON.stringify(procedure) === JSON.stringify(formValues)) {
                Swal.fire('Atención', 'No hubo cambios', 'info');
            } else {
                dispatch(updateProcedure(formValues));
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
            <h2 className="mt-4">Actualización de tratamiento</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                    <label
                        htmlFor="inputName"
                        className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        autoComplete="off"
                        value={name}
                        name="name"
                        onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-4">
                    <label
                        htmlFor="inputValue"
                        className="form-label">
                        Costo
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="inputValue"
                        autoComplete="off"
                        value={value}
                        name="value"
                        onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-4 mt-5">
                    <select
                        id="comboType"
                        className="form-control"
                        onChange={handleInputChange}
                        name="type"
                        value={type}
                    >
                        <option
                            value={"TRATAMIENTO"}>
                            TRATAMIENTO
                        </option>
                        <option
                            value={"EXTRA"}>
                            EXTRA
                        </option>
                    </select>
                </div>
                <div className="form-group">
                    <label
                        htmlFor="inputDescription">
                        Descripción
                    </label>
                    <textarea
                        id="inputDescription"
                        className="form-control"
                        rows="2"
                        autoComplete="off"
                        name="description"
                        value={description}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group col-12">
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
