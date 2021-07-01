import React from 'react'
import { useDispatch } from 'react-redux';
import { addProcedure } from '../../redux/actions/procedures';
import { useForm } from '../hooks/useForm';

export const ProcedureRegister = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        name: '',
        value: '',
        type: '',
        description: ''
    });

    const { name, value, type, description } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProcedure(values));
        reset();
    }

    return (
        <>
            <p className="fs-3 text-center mt-3">Agregar nuevo tratamiento/extra</p>
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
                    <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="normalProcedure"
                        value="TRATAMIENTO"
                        checked={type === "TRATAMIENTO"}
                        onChange={handleInputChange} />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="normalProcedure">
                        Tratamiento
                    </label>
                    <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="extraProcedure"
                        value="EXTRA"
                        checked={type === "EXTRA"}
                        onChange={handleInputChange} />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="extraProcedure">
                        Extra
                    </label>
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
                        onChange={handleInputChange}/>
                </div>
                <div className="form-group col-12">
                    <button
                        type="submit"
                        className="btn btn-success m-1">
                        Registrar
                    </button>
                </div>
            </form>
        </>
    )
}
