import React from 'react';
import { useDispatch } from 'react-redux';
import { addProfessional } from '../../redux/actions/professionals';
import { useForm } from '../hooks/useForm';

export const ProfessionalsRegister = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        document: '',
        name: '',
        specialty: ''
    });

    const { document, name, specialty } = values;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addProfessional(values));
        reset();
    }

    return (
        <div>
            <p className="fs-3 text-center mt-3">Agregar nuevo profesional</p>
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
        </div>
    )
}
