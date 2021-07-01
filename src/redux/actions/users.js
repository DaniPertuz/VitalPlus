import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

export const addUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('users', user, 'POST');
            if (resp.status === 200) {
                const body = await resp.json();
                dispatch(userAddNew(body));
                Swal.fire('Listo', 'Usuario registrado', 'success');
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

const userAddNew = (user) => ({
    type: types.usersAddNew,
    payload: user
});

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken('users');
            const body = await resp.json();

            const users = body.users;
            dispatch(loadingUsers(users));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingUsers = (users) => ({
    type: types.usersRead,
    payload: users
});


export const getUser = (email) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`users/${email}`);
            const body = await resp.json();
            dispatch(loadingUser(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingUser = (user) => ({
    type: types.userRead,
    payload: user
});

export const updateUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithoutToken(`users/${user._id}`, user, 'PUT');

            if (resp.status === 200) {
                dispatch(userUpdate(user));
                Swal.fire('Listo', 'Usuario actualizado', 'success');
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

const userUpdate = (user) => ({
    type: types.userUpdate,
    payload: user
});

export const deleteUser = (_id, name) => {
    return async (dispatch) => {
        try {
            Swal.fire({
                title: '¿Está seguro?',
                text: `Eliminar usuario ${name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    const resp = fetchWithToken(`users/${_id}`, {}, 'DELETE');
                    resp.then(() => {
                        dispatch(userDeleting());
                        Swal.fire('Eliminado', `Usuario ${name} eliminado.`, 'info');
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const userDeleting = () => ({ type: types.usersDelete });