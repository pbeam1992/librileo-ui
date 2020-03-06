import {LOAD_MY_CONTRACT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SET_USER_INFORMATION} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('LOGIN_SUCCESS');
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false
            };
        case LOGIN_FAIL:
            console.log('LOGIN_FAIL');
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            };
        case SET_USER_INFORMATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value
                }
            };
        case LOAD_MY_CONTRACT:
            return {
                ...state,
                myContracts: action.payload
            };
        default:
            return state;
    }
};