import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPatient } from '../../redux/actions/patients';
import { useForm } from '../hooks/useForm';

export const PatientsRegister = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        name: '',
        document: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        procedure: '',
        professional: '',
        transferred: false
    });

    const { data: proceduresDB } = useSelector(state => state.procedures);
    const { data: professionalsDB } = useSelector(state => state.professionals);
    const { patient } = useSelector(state => state.patients);

    const [procedures,] = useState(proceduresDB)
    const [professionals,] = useState(professionalsDB);

    const { name, document, phone, address, dateOfBirth, procedure, professional, transferred } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPatient(values));
        if (JSON.stringify(patient) === JSON.stringify(values)) {
            reset();
        }
    }

    return (
        <>
            <p className="fs-3 text-center mt-3">Agregar nuevo paciente</p>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                    <label
                        htmlFor="inputDocument"
                        className="form-label">
                        No. de documento
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="inputDocument"
                        autoComplete="off"
                        name="document"
                        value={document}
                        onChange={handleInputChange}
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
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputAddress"
                        className="form-label">
                        Dirección
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        autoComplete="off"
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputPhone"
                        className="form-label">
                        Teléfono
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="inputPhone"
                        autoComplete="off"
                        name="phone"
                        value={phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="comboProfessional"
                        className="form-label">
                        Profesional
                    </label>
                    <select
                        id="comboProfessional"
                        className="form-select"
                        name="professional"
                        value={professional}
                        onChange={handleInputChange}
                    >
                        <option defaultValue>Seleccione...</option>
                        {
                            professionals.map((professional, index) =>
                                <option key={index} value={professional._id}>{professional.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="comboProcedure"
                        className="form-label"
                    >
                        Tratamiento
                    </label>
                    <select
                        id="comboProcedure"
                        className="form-select"
                        name="procedure"
                        value={procedure}
                        onChange={handleInputChange}
                    >
                        <option defaultValue>Seleccione...</option>
                        {
                            procedures.map((procedure, index) =>
                                <option key={index} value={procedure._id}>{procedure.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputDateOfBirth"
                        className="form-check-label col-md-12"
                    >
                        Fecha de nacimiento
                    </label>
                    <input
                        id="inputDateOfBirth"
                        type="date"
                        className="form-control mt-2"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <label
                        htmlFor="comboTransferred"
                        className="form-check-label mt-2"
                    >
                        Remitido
                    </label>
                    <select
                        id="comboTransferred"
                        className="form-select"
                        name="transferred"
                        value={transferred}
                        onChange={handleInputChange}
                    >
                        <option value={true}>Sí</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="col-md-7 mt-4">
                    <button
                        type="submit"
                        className="btn btn-success m-1"
                    >
                        Registrar
                    </button>
                </div>
            </form>
        </>
    )
}
