import { MetagameActions } from '../actions';

const initialState = {
    isLoading: false 
};

const app = (state = initialState, action) => {
    switch(action.type) {
        case MetagameActions.FETCH_METAGAME_DATA_REQUEST:
            return Object.assign({}, state, { isLoading: true });
        case MetagameActions.FETCH_METAGAME_DATA_FAILURE:
        case MetagameActions.FETCH_METAGAME_DATA_SUCCESS:
            return Object.assign({}, state, { isLoading: false });
        default:
            return state;
    }
}

export default app;
