import React, {useReducer} from "react";
import authReducer from "./authReducer";
import AuthContext from './authContext';
import axios from 'axios';

import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SET_DYNAMIC_FORM_INPUT, SET_USER_INFORMATION} from '../types';

const AuthState = props => {
        const initialState = {
            isLoading: true,
            isAuthenticated: false,
            user: {
                id: null,
                email: '',
                password: '',
                confirmPassword: '',
                title: '',
                lastname: '',
                firstname: '',
                birthname: '',
                placeOfBirth: '',
                street: '',
                houseNumber: '',
                place: '',
                postcode: '10310',
                socialBenefitId: 15750,
                dateOfBirth: '',
                serviceCenterId: 0
            },
            error: null
        };

        const [state, dispatch] = useReducer(authReducer, initialState);

        // Login
        const login = formData => {
            axios.post('http://stage1.pimcore.testanwendungen.de/service/user/login', formData)
                .then((res) => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data
                    })
                })
                .catch((errors) => {
                    console.log('Errors', errors);
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: errors.response.data
                    });
                });
        };

        const setUserInformation = (name, value) => {
            dispatch({
                    type: SET_USER_INFORMATION,
                    payload: {
                        name, value
                    }
                }
            )
        };

        const logout = () => {
            dispatch({
                type: LOGOUT,
                payload: initialState.user
            })
        };

        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    error: state.error,
                    isLoading: state.isLoading,
                    login,
                    logout,
                    setUserInformation
                }}
            >
                {props.children}
            </AuthContext.Provider>
        )
    }
;

export default AuthState;