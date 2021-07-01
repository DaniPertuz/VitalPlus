import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

export const addProcedure = (procedure) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('procedures', procedure, 'POST');
            if (resp.status === 200) {
                const body = await resp.json();
                dispatch(procedureAddNew(body));
                if (body.type === "EXTRA") {
                    Swal.fire('Listo', 'Gasto extra registrado', 'success');
                } else {
                    Swal.fire('Listo', 'Tratamiento registrado', 'success');
                }
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

const procedureAddNew = (procedure) => ({
    type: types.proceduresAddNew,
    payload: procedure
});

export const getProcedures = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('procedures');
            const body = await resp.json();

            const procedures = body.procedures;
            dispatch(loadingProcedures(procedures));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProcedure = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`procedures/${id}`);
            const body = await resp.json();
            dispatch(loadingProcedure(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProcedure = (procedure) => ({
    type: types.procedureRead,
    payload: procedure
});

const loadingProcedures = (procedures) => ({
    type: types.proceduresRead,
    payload: procedures
});

export const updateProcedure = (procedure) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`procedures/${procedure._id}`, procedure, 'PUT');

            if (resp.status === 200) {
                dispatch(procedureUpdate(procedure));
                if (procedure.type === "EXTRA") {
                    Swal.fire('Listo', 'Gasto extra actualizado', 'success');
                } else {
                    Swal.fire('Listo', 'Tratamiento actualizado', 'success');
                }
            } else {
                resp.json()
                    .then(data => {
                        Swal.fire('Error', data.errors.map((error) => error.msg).join(', '), 'error');
                        console.log(data.errors);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const procedureUpdate = (procedure) => ({
    type: types.procedureUpdate,
    payload: procedure
});

export const deleteProcedure = (_id, name) => {
    return async (dispatch) => {
        try {
            Swal.fire({
                title: '¿Está seguro?',
                text: `Eliminar concepto ${name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    const resp = fetchWithToken(`procedures/${_id}`, {}, 'DELETE');
                    resp.then(() => {
                        dispatch(procedureDeleting());
                        Swal.fire('Listo', `Concepto ${name} eliminado`, 'info');
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const procedureDeleting = () => ({ type: types.proceduresDelete });