import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

export const addProfessional = (professional) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('professionals', professional, 'POST');
            if (resp.status === 200) {
                const body = await resp.json();
                dispatch(professionalAddNew(body));
                Swal.fire('Resgitro exitoso', 'Profesional registrado', 'success')
            } else {
                resp.json()
                    .then(data => {
                        Swal.fire('Error', data.errors.map((error) => error.msg).join(', '), 'error');
                    });
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const professionalAddNew = (professional) => ({
    type: types.professionalsAddNew,
    payload: professional
});

export const getProfessionals = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('professionals');
            const body = await resp.json();

            const professionals = body.professionals;
            dispatch(loadingProfessionals(professionals));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProfessionals = (professionals) => ({
    type: types.professionalsRead,
    payload: professionals
});

export const getProfessional = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`professionals/${id}`);
            const body = await resp.json();
            dispatch(loadingProfessional(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingProfessional = (professional) => ({
    type: types.professionalRead,
    payload: professional
});

export const updateProfessional = (professional) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`professionals/${professional._id}`, professional, 'PUT');

            if (resp.status === 200) {
                dispatch(professionalUpdate(professional));
                Swal.fire('Listo', 'Profesional actualizado', 'success');
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

const professionalUpdate = (professional) => ({
    type: types.professionalUpdate,
    payload: professional
});

export const deleteProfessional = (_id, name) => {
    return async (dispatch) => {
        try {
            Swal.fire({
                title: '¿Está seguro?',
                text: `Eliminar profesional ${name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    const resp = fetchWithToken(`professionals/${_id}`, {}, 'DELETE');
                    resp.then(() => {
                        dispatch(professionalDeleting());
                        Swal.fire(
                            'Eliminado',
                            `Profesional ${name} eliminado.`,
                            'info'
                        )
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const professionalDeleting = () => ({ type: types.professionalsDelete });