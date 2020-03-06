import {
    GET_FORM_QUESTIONS,
    SET_FORMULAR,
    GET_SERVICE_CENTER,
    LOAD_SOCIAL_BENEFIT,
    SET_DYNAMIC_FORM_INPUT, SET_DYNAMIC_QUESTION, SET_PDF_PATH, SET_SERVICE_CENTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOAD_SOCIAL_BENEFIT:
            return {
                ...state,
                socialBenefits: action.payload
            };
        case GET_SERVICE_CENTER:
            return {
                ...state,
                serviceCenters: action.payload
            };
        case GET_FORM_QUESTIONS:
            return {
                ...state,
                questionData: action.payload,
                dynamicQuestionAnswer:
                    {[action.payload.id]: ''}
            };
        case SET_FORMULAR:
            return {
                ...state,
                formId: action.payload
            };
        case SET_DYNAMIC_FORM_INPUT:
            return {
                ...state,
                dynamicQuestionAnswer: {
                    ...state.dynamicQuestionAnswer,
                    [action.payload.name]: action.payload.value
                }
            };
        case SET_PDF_PATH:
            return {
                ...state,
                previewPath: action.payload
            };
        default:
            return state;
    }
}