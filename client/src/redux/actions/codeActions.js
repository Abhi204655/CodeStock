import { CODE_COMPILED, LOADING_CODE, CODE_FAILED, CHANGE_LANG, SET_CODE } from './types';
import axios from 'axios';

export const compileCode = (code, inputData) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CODE
    })
    try {
        const data = {
            code,
            input: inputData ? inputData : '',
            language: getState().code.language
        }
        console.log(getState().language)
        const res = await axios.post('/compile', data);
        dispatch({
            type: CODE_COMPILED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CODE_FAILED,
            payload: err.message
        })
    }
}

export const changeLanguage = (lang) => dispatch => {
    dispatch(
        { type: CHANGE_LANG, payload: lang }
    )
}

export const setCode = (code, input) => dispatch => {
    dispatch(
        { type: SET_CODE, payload: { code, input } }
    )
}