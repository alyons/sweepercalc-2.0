import { AppActions, UsageActions } from '../actions';

const actionWhiteList = [
    UsageActions.SELECT_POKEMON
];

const appMiddleware = (store) => (next) => (action) => {
    next(action);

    if (!actionWhiteList.includes(action.type)) return;

    switch (action.type) {
        case UsageActions.SELECT_POKEMON:
            store.dispatch(AppActions.setView('Details'));
            break;
        default: return;
    }
};

export default appMiddleware;
