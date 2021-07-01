import { types } from '../../types/types';

const initialState = [];

export const ReportsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case types.reportsPatient:
    case types.reportsProcedure:
    case types.reportsProfessional:
        return {
            ...state,
            data: payload.reports,
            total: payload.total
        }
    default:
        return state;
    }
}
