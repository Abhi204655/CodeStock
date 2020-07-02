import { CODE_COMPILED, LOADING_CODE, CODE_FAILED, CHANGE_LANG, SET_CODE } from '../actions/types';
const initialState = {
    code: '',
    input: '',
    output: {},
    loading: false,
    error: null,
    language: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CODE:
            return {
                ...state,
                loading: true,
            }
        case CODE_COMPILED:
            return {
                ...state,
                output: action.payload,
                loading: false
            }
        case CODE_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CHANGE_LANG:
            localStorage.setItem('lang', action.payload)
            return {
                ...state,
                language: action.payload
            }
        case SET_CODE:
            sessionStorage.setItem('code', action.payload.code)
            return {
                ...state,
                code: action.payload.code
            }
        default:
            const lang = localStorage.getItem('lang');
            const code = sessionStorage.getItem('code');
            return {
                ...state,
                language: lang ? lang : 'Py',
                code: code ? code : '',
                input: ''
            }
    }
}
