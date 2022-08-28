import {
    LOADING,
    DATAUSER,
    REMOVEUSER,
    TOKENUSER,
} from './GlobalTypes';

const GlobalReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOADING:
            return {
                ...state,
                loading: payload,
            };
        case DATAUSER:
        return {
            ...state,
            dataUser: payload,
        };
        case TOKENUSER:
        return {
            ...state,
            tokenUser: payload,
        };
        case REMOVEUSER:
        return {
            loading:false,
            dataUser: [],
            tokenUser:'',
        }; 
        default:
            return state;
    }
};

export default GlobalReducer;