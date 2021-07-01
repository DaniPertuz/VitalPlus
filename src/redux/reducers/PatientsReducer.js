import { types } from '../../types/types';

const initialState = [];

export const PatientsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.patientsRead:
            return {
                ...state,
                data: [...payload]
            }
        case types.patientRead:
            return {
                ...state,
                patient: payload
            }
        case types.patientsAddNew:
            return {
                ...state,
                data: [...state.data, payload]
            }
        case types.patientsUpdate:
            return {
                ...state,
                data: state.data.map(
                    e => (e._id === payload._id) ? payload : e
                )
            }
        case types.patientsDelete:
            return {
                ...state,
                data: state.data.filter(
                    e => (e._id !== state.patient._id)
                ),
                patient: null
            }
        default:
            return state;
    }
}
