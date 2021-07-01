import { types } from '../../types/types';

const initialState = {
    modalDialog: false
}

export const ModalReducer = (state = initialState, { type }) => {
    switch (type) {

    case types.uiOpenModal:
        return {
            ...state,
            modalDialog: true
        }

    case types.uiCloseModal:
        return {
            ...state,
            modalDialog: false
        }

    default:
        return state;
    }
}
