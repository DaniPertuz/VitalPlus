import { types } from '../../types/types';

const initialState = [];

export const ProfessionalsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.professionalsRead:
            return {
                ...state,
                data: [...payload]
            }
        case types.professionalRead:
            return {
                ...state,
                professional: payload
            }
        case types.professionalsAddNew:
            return {
                ...state,
                data: [...state.data, payload]
            }
        case types.professionalUpdate:
            return {
                ...state,
                data: state.data.map(
                    e => (e._id === payload._id) ? payload : e
                )
            }
        case types.professionalsDelete:
            return {
                ...state,
                data: state.data.filter(
                    e => (e._id !== state.professional._id)
                ),
                professional: null
            }
        default:
            return state;
    }
}
