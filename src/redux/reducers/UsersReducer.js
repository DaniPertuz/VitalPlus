import { types } from '../../types/types';

const initialState = [];

export const UsersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.usersRead:
            return {
                ...state,
                data: [...payload]
            }
        case types.userRead:
            return {
                ...state,
                user: payload
            }
        case types.usersAddNew:
            return {
                ...state,
                data: [...state.data, payload],
                user: payload
            }
        case types.userUpdate:
            return {
                ...state,
                data: state.data.map(
                    e => (e._id === payload._id) ? payload : e
                )
            }
        case types.usersDelete:
            return {
                ...state,
                data: state.data.filter(
                    e => (e._id !== state.user._id)
                ),
                user: null
            }
        default:
            return state;
    }
}
