import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { getPatient } from '../../redux/actions/patients';
import { getPaymentsByPatient } from '../../redux/actions/payments';
import { useForm } from '../hooks/useForm';
import { PaymentsList } from './PaymentsList';
import { PaymentsRegister } from './PaymentsRegister';

export const PaymentsScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({ document: '' });

    const { document } = values;

    const { data } = useSelector(state => state.payments);
    const { patient } = useSelector(state => state.patients);

    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState(false);

    useEffect(() => {
        setPayments(data);
        dispatch(getPatient(document));
    }, [dispatch, data, document]);

    const onHandleSubmit = (event) => {
        event.preventDefault();
        if (patient.document) {
            Swal.fire('', `Paciente ${patient.name}`, 'info');
            dispatch(getPaymentsByPatient(document));
        } else {
            Swal.fire('', `No se encontraron pacientes con documento ${document}`, 'warning');
        }
    }

    const handleNewPayment = () => {
        setNewPayment(!newPayment);
    }

    return (
        <div className="container">
            <h3 className="fs-3 text-center mt-3">Pagos</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <button
                                onClick={handleNewPayment}
                                className={newPayment
                                    ? "btn btn-danger"
                                    : "btn btn-primary"}
                            >
                                {newPayment
                                    ? 'Cancelar'
                                    : 'Nuevo'}
                            </button>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-12 col-md-6 mt-2 order-first">
                        {newPayment &&
                            <PaymentsRegister />
                        }
                    </div>
                    </div>
                    <div className="row">                    
                    <div className="col-md-12">
                    <form onSubmit={onHandleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-4 offset-md-2 my-2">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputDocument"
                                        name="document"
                                        placeholder="Cédula del paciente"
                                        onChange={handleInputChange}
                                        value={document}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary my-2"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 order-last">
                    {payments &&
                        <PaymentsList payments={payments} />
                    }
                </div>
            </div>


        </div>
    )
}
