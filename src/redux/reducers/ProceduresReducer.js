import { types } from '../../types/types';

const initialState = [];

export const ProcedureReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.proceduresRead:
            return {
                ...state,
                data: [...payload]
            }
        case types.proceduresAddNew:
            return {
                ...state,
                data: [...state.data, payload]
            }
        case types.procedureRead:
            return {
                ...state,
                procedure: payload
            }
        case types.procedureUpdate:
            return {
                ...state,
                data: state.data.map(
                    e => (e._id === payload._id) ? payload : e
                )
            }
        case types.proceduresDelete:
            return {
                ...state,
                data: state.data.filter(
                    e => (e._id !== state.procedure._id)
                ),
                procedure: null
            }
        default:
            return state;
    }
}
