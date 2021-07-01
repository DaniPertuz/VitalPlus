import { fetchWithoutToken } from '../../helpers/fetch';
import { types } from '../../types/types';

export const reportsByPatient = (range = '', id = '') => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`search/patients/${range}/${id}`);
            const body = await resp.json();

            const reports = body.payments;
            const total = body.total;
            dispatch(loadingPatients(reports, total));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingPatients = (reports, total) => ({
    type: types.reportsPatient,
    payload: { reports, total }
});

export const reportsByProcedure = (range = '', id = '') => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`search/procedures/${range}/${id}`);
            const body = await resp.json();

            const reports = body.payments;
            const total = body.total;
            dispatch(loadingProcedures(reports, total));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProcedures = (reports, total) => ({
    type: types.reportsProcedure,
    payload: { reports, total }
});

export const reportsByProfessional = (range = '', id = '') => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`search/professionals/${range}/${id}`);
            const body = await resp.json();

            const reports = body.payments;
            const total = body.total;
            dispatch(loadingProfessionals(reports, total));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProfessionals = (reports, total) => ({
    type: types.reportsProfessional,
    payload: { reports, total }
});