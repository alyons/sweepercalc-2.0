import { AppActions, MetagameActions } from '../actions';

const initialState = {
    isLoading: false,
    name: 'default',
    size: null,
    view: 'LIST'
};

const app = (state = initialState, action) => {
    switch(action.type) {
        case AppActions.SET_ACTIVE_BREAKPOINT:
            return Object.assign({}, state, { name: action.name, size: action.size });
        case AppActions.SET_VIEW:
            return Object.assign({}, state, { view });
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
