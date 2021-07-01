import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

export const addPatient = (patient) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('patients', patient, 'POST');
            if (resp.status === 200) {
                const body = await resp.json();
                dispatch(patientAddNew(body));
                Swal.fire('Listo', 'Paciente registrado', 'success');
            } else {
                resp.json()
                    .then(data => {
                        Swal.fire('Error', data.errors.map((error) => error.msg).join(', '), 'error');
                    })
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const patientAddNew = (patient) => ({
    type: types.patientsAddNew,
    payload: patient
});

export const getPatients = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('patients');
            const body = await resp.json();

            const patients = body.patients;
            dispatch(loadingPatients(patients));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingPatients = (patients) => ({
    type: types.patientsRead,
    payload: patients
});

export const getPatient = (document) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`patients/${document}`);
            const body = await resp.json();
            dispatch(loadingPatient(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingPatient = (patient) => ({
    type: types.patientRead,
    payload: patient
});

export const updatePatient = (patient) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`patients/${patient._id}`, patient, 'PUT');
            const body = await resp.json();
            if (resp.status === 200) {
                dispatch(patientUpdate(body));
                Swal.fire('Listo', 'Paciente actualizado', 'success');
            } else {
                resp.json()
                    .then(data => {
                        Swal.fire('Error', data.errors.map((error) => error.msg).join(', '), 'error');
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const patientUpdate = (patient) => ({
    type: types.patientsUpdate,
    payload: patient
});

export const deletePatient = (_id, name) => {
    return async (dispatch) => {
        try {
            Swal.fire({
                title: '¿Está seguro?',
                text: `Eliminar paciente ${name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    const resp = fetchWithToken(`patients/${_id}`, {}, 'DELETE');
                    resp.then(() => {
                        dispatch(patientDeleting());
                        Swal.fire('Eliminado', `Paciente ${name} eliminado.`, 'info');
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const patientDeleting = () => ({ type: types.patientsDelete });