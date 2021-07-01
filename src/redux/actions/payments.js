import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../../helpers/fetch';
import { types } from '../../types/types';

export const getPaymentsByPatient = (document = '') => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`payments/patients/${document}`);
            const body = await resp.json();

            const payments = body.payments;
            dispatch(loadingProcedures(payments));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProcedures = (payments) => ({
    type: types.paymentsPatient,
    payload: payments
});

export const addPayment = (payment) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('payments', payment, 'POST');
            if (resp.status === 200) {
                const body = await resp.json();
                dispatch(paymentAddNew(body));
                Swal.fire('Listo', 'Pago registrado', 'success');
            } else {
                resp.json()
                .then(data => {
                    if (data.errors) {
                        Swal.fire('Error', data.errors.map((error) => error.msg).join(', '), 'error');
                    } else {
                        Swal.fire('Error', data.msg, 'error');
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const paymentAddNew = (payment) => ({
    type: types.paymentAddNew,
    payload: payment
});