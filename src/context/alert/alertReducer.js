import {SET_ALERT, REMOVE_ALERT} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                ...action.payload,
                show: true
            };
        case REMOVE_ALERT:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
};
