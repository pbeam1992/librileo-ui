import React, {useContext, useReducer} from "react";
import alertReducer from "./alertReducer";
import AlertContext from './alertContext';
import {REMOVE_ALERT, SET_ALERT} from "../types";
import AuthContext from '../auth/authContext';

const AlertState = props => {
    const initialState = {
        show: false,
        title: 'Default title',
        message: 'Default message'
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const authContext = useContext(AuthContext);
    const { removeErrors} = authContext;

    // Set Alert
    const setAlert = (title, message) => {
        dispatch({
            type: SET_ALERT,
            payload: {title, message}
        })
    };

    // Close alert
    const closeAlert = () => {
        dispatch({
            type: REMOVE_ALERT
        });
        removeErrors();
    };

    return (
        <AlertContext.Provider
            value={{
                show: state.show,
                message: state.message,
                title: state.title,
                setAlert,
                closeAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;