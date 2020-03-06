import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REMOVE_ERRORS, SET_USER_INFORMATION} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log('LOGIN_SUCCESS');
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        }
        case LOGOUT: {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false
            };
        }
        case LOGIN_FAIL: {
            console.log('LOGIN_FAIL');
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        }
        case SET_USER_INFORMATION: {
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case REMOVE_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};