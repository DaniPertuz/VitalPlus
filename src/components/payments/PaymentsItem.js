import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const PaymentsItem = ({
    value,
    method,
    patient,
    professional,
    procedure,
    type,
    date,
    balance
}) => {

    const handleDate = () => {
        return moment(date).utc().format('MMMM D, YYYY');
    }

    const handleMethod = (method) => {
        switch (method) {
            case 'EFECTIVO':
                return 'card-text text-success';
            case 'DEBITO':
                return 'card-text text-primary';
            case 'CREDITO':
                return 'card-text text-warning';
            default:
                return 'card-text text-dark';
        }
    }

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5 className="text-dark">{procedure.name} - {procedure.type} - Valor: {procedure.value}</h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">Valor: {value}</h5>
                <p className={handleMethod(method)}>{method}</p>
                <p className="card-text text-primary">{type}</p>
                <p className="card-text text-dark">Profesional: {professional.name}</p>
                <p className="card-text text-capitalize">{handleDate()}</p>
                <p className="card-text text-danger">Saldo: {balance}</p>
            </div>
        </div>
    )
}
