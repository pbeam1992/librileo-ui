import React, {useContext, useReducer} from "react";
import ContractContext from './contractContext';
import AuthContext from '../auth/authContext';
import axios from 'axios';
import {
    GET_FORM_QUESTIONS,
    GET_SERVICE_CENTER,
    LOAD_SOCIAL_BENEFIT,
    SET_DYNAMIC_FORM_INPUT,
    SET_FORMULAR,
    SET_PDF_PATH
} from '../types';
import contractReducer from "./contractReducer";

const ContractState = props => {
    const initialState = {
        socialBenefits: [],
        serviceCenters: [],
        questionData: [],
        formId: 0,
        dynamicQuestionAnswer: {
            15874: 15875
        },
        previewPath: ''
    };

    const authContext = useContext(AuthContext);
    const {user} = authContext;

    const [state, dispatch] = useReducer(contractReducer, initialState);

    const getSocialBenefits = () => {
        axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/socialBenefits')
            .then((res) => {
                dispatch({
                    type: LOAD_SOCIAL_BENEFIT,
                    payload: res.data
                });
            })
            .catch((errors) => {

            });
    };

    const getServiceCenters = postcode => {
        axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/serviceCenters')
            .then((res) => {
                // Filter only service center matched input postcode
                console.log('getServiceCenters', res.data);
                dispatch({
                    type: GET_SERVICE_CENTER,
                    payload: res.data.filter(m => m.postcode === postcode)
                });
            });
    };

    const getQuestions = formularId => {
        axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/formulars/' + formularId)
            .then((result) => {
                dispatch({
                    type: GET_FORM_QUESTIONS,
                    payload: result.data
                });
            });
    };

    const getMatchedFormular = async (socialBenefitId, serviceCenterId) => {
        await axios.get('http://stage1.pimcore.testanwendungen.de/service/antrag/formulars')
            .then((result) => {
                const data = result.data;
                let foundWithSocialBenefits = [];
                let foundWithServiceCenters = [];

                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].socialBenefits.length; j++) {
                        if (data[i].socialBenefits[j].id === socialBenefitId) {
                            foundWithSocialBenefits.push(data[i].id);
                        }
                    }

                    for (let j = 0; j < data[i].serviceCenters.length; j++) {
                        if (data[i].serviceCenters[j].id === serviceCenterId) {
                            foundWithServiceCenters.push(data[i].id);
                        }
                    }
                }

                // Find a matched formular
                foundWithSocialBenefits.forEach((social, index) => {
                    foundWithServiceCenters.forEach((service, index) => {
                        if (social === service) {
                            dispatch({
                                type: SET_FORMULAR,
                                payload: social
                            });
                        }
                    });
                });
            });
    };

    const setDynamicFormInput = (name, value) => {
        dispatch({
                type: SET_DYNAMIC_FORM_INPUT,
                payload: {
                    name, value
                }
            }
        )
    };

    const setPdf = async () => {

        console.log('user.socialBenefitId', user.socialBenefitId);

        await axios.post(`http://stage1.pimcore.testanwendungen.de/pdf/saveToAsset/${user.socialBenefitId}/${user.serviceCenterId}/${state.formId}/` + user.id, state.dynamicQuestionAnswer)
            .then((res) => {
                dispatch({
                    type: SET_PDF_PATH,
                    payload: 'http://stage1.pimcore.testanwendungen.de' + res.data.path
                });
            })
            .catch(() => {

            });
    };

    return (
        <ContractContext.Provider
            value={{
                socialBenefits: state.socialBenefits,
                serviceCenters: state.serviceCenters,
                questionData: state.questionData,
                formId: state.formId,
                dynamicQuestionAnswer: state.dynamicQuestionAnswer,
                previewPath: state.previewPath,
                getSocialBenefits,
                getServiceCenters,
                getQuestions,
                getMatchedFormular,
                setDynamicFormInput,
                setPdf,
            }}
        >
            {props.children}
        </ContractContext.Provider>
    )
};

export default ContractState;