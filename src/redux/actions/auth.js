import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

export const startLogin = (username, password) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/login', { username, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(body));
        } else if (body.msg) {
            Swal.fire('Error', body.msg, 'error');
        } else {
            Swal.fire('Error', body.errors.map((error) => error.msg).join(', '), 'error');
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startChecking = () => {
    return async (dispatch) => {

        const isCurrentToken = !!(localStorage.getItem('token') || '');

        if (!isCurrentToken) {
            dispatch(checkingFinish());
            return;
        }

        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                username: body.username,
                name: body.name,
                role: body.role
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout });