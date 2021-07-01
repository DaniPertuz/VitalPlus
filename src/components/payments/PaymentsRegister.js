import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment } from '../../redux/actions/payments';
import { useForm } from '../hooks/useForm';

import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

export const PaymentsRegister = () => {

    const dispatch = useDispatch();

    const { data: proceduresDB } = useSelector(state => state.procedures);
    const { data: professionalsDB } = useSelector(state => state.professionals);
    const { patient } = useSelector(state => state.patients);

    const [procedures,] = useState(proceduresDB)
    const [professionals,] = useState(professionalsDB);

    const [values, handleInputChange] = useForm({
        value: '',
        method: '',
        patient: '',
        professional: '',
        procedure: '',
        type: '',
        date: ''
    });

    const { value, method, professional, procedure, type } = values;

    const handleAddPayment = (event) => {
        event.preventDefault();
        if (!patient) {
            Swal.fire('Atención', 'No se ha consultado ningún paciente', 'warning');
        } else {
            values.patient = patient._id;
            values.date = handleDate();
            dispatch(addPayment(values));
        }
    }

    const handleDate = () => {
        return moment().utc().format('YYYY-MM-DD');
    }

    return (
        <form onSubmit={handleAddPayment}>
            <div className="row">
                <div className="col-sm-6 mb-2">
                    <input
                        id="inputValue"
                        type="number"
                        className="form-control"
                        placeholder="Valor del abono"
                        autoComplete="off"
                        name="value"
                        value={value}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-sm-6">
                    <div className="btn-group">
                        <input
                            id="initialFee"
                            type="radio"
                            className="btn-check"
                            autoComplete="off"
                            name="type"
                            value="INICIAL"
                            checked={type === "INICIAL"}
                            onChange={handleInputChange}
                        />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="initialFee"
                        >
                            Cuota inicial
                        </label>
                        <input
                            id="normalFee"
                            type="radio"
                            className="btn-check"
                            autoComplete="off"
                            name="type"
                            value="ABONO"
                            checked={type === "ABONO"}
                            onChange={handleInputChange}
                        />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="normalFee"
                        >
                            Abono
                        </label>
                    </div>
                </div>
                <div className="col-sm-6 mt-2">
                    <select
                        className="form-select"
                        name="procedure"
                        value={procedure}
                        onChange={handleInputChange}>
                        <option defaultValue>Tratamiento...</option>
                        {
                            procedures.map((procedure, index) =>
                                <option key={index} value={procedure._id}>{procedure.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-sm-6 mt-2">
                    <input
                        id="efectiveMethod"
                        type="radio"
                        className="btn-check"
                        autoComplete="off"
                        name="method"
                        value="EFECTIVO"
                        checked={method === "EFECTIVO"}
                        onChange={handleInputChange}
                    />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="efectiveMethod"
                    >
                        Efectivo
                    </label>
                    <input
                        id="creditMethod"
                        type="radio"
                        className="btn-check"
                        autoComplete="off"
                        name="method"
                        value="CREDITO"
                        checked={method === "CREDITO"}
                        onChange={handleInputChange}
                    />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="creditMethod"
                    >
                        Crédito
                    </label>
                    <input
                        id="debitMethod"
                        type="radio"
                        className="btn-check"
                        autoComplete="off"
                        name="method"
                        value="DEBITO"
                        checked={method === "DEBITO"}
                        onChange={handleInputChange}
                    />
                    <label
                        className="btn btn-outline-secondary"
                        htmlFor="debitMethod"
                    >
                        Débito
                    </label>
                </div>
                <div className="col-sm-6 mt-2">
                    <select
                        className="form-select"
                        name="professional"
                        value={professional}
                        onChange={handleInputChange}>
                        <option defaultValue>Profesional...</option>
                        {
                            professionals.map((professional, index) =>
                                <option key={index} value={professional._id}>{professional.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-sm-6 mt-2">
                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Registrar
                    </button>
                </div>
            </div>
            <hr />
        </form>
    )
}
