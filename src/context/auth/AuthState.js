import React, {useReducer} from "react";
import authReducer from "./authReducer";
import AuthContext from './authContext';
import axios from 'axios';

import {
    LOAD_MY_CONTRACT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_USER_INFORMATION,
    REMOVE_ERRORS, SET_REGISTER_INFORMATION
} from '../types';

const AuthState = props => {
        const initialState = {
            isLoading: true,
            isAuthenticated: false,
            user: {
                id: null,
                email: '',
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
            registerUser: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: null,
            myContracts: []
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

        const register = async () => {
            let data = {
                user: state.user,
                registerUser: state.registerUser
            };

            axios.post('http://stage1.pimcore.testanwendungen.de/service/user/create', data)
                .then((res) => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data
                    })
                })
                .catch((errors) => {
                    console.log(errors);
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

        const setRegisterInformation = (name, value) => {
            dispatch({
                    type: SET_REGISTER_INFORMATION,
                    payload: {
                        name, value
                    }
                }
            )
        };

        const loadMyContracts = () => {
            axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/by/' + state.user.id)
                .then((res) => {
                    dispatch({
                        type: LOAD_MY_CONTRACT,
                        payload: res.data
                    })
                });
        };

        const sendEmail = (contractId) => {
            axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/email/' + state.user.id + "/" + contractId)
                .then((result) => {
                    // Success
                });
        };

        const logout = () => {
            dispatch({
                type: LOGOUT,
                payload: initialState.user
            })
        };

        const removeErrors = () => {
            dispatch({
                type: REMOVE_ERRORS
            })
        };

        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    error: state.error,
                    isLoading: state.isLoading,
                    myContracts: state.myContracts,
                    registerUser: state.registerUser,
                    login,
                    logout,
                    setUserInformation,
                    removeErrors,
                    loadMyContracts,
                    sendEmail,
                    setRegisterInformation,
                    register
                }}
            >
                {props.children}
            </AuthContext.Provider>
        )
    }
;

export default AuthState;