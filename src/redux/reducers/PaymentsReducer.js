import { types } from '../../types/types';

const initialState = [];

export const PaymentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.paymentsPatient:
            return {
                ...state,
                data: [...payload]
            }
        case types.paymentAddNew:
            return {
                ...state,
                data: [payload, ...state.data]
            }
        default:
            return state;
    }
}
