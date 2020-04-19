import { createAction } from 'redux-api-middleware';

import { MetagameActions } from '../actions';

const actionWhiteList = [
    MetagameActions.SELECT_YEAR,
    MetagameActions.SELECT_MONTH,
    MetagameActions.SELECT_GEN,
    MetagameActions.SELECT_FORMAT,
    MetagameActions.SELECT_RANK
];

const metagameMiddleware = (store) => (next) => (action) => {
    next(action);

    if (!actionWhiteList.includes(action.type)) return;
    const state = store.getState();
    const { year, month, gen, format, rank } = state.metagame;
    const request = {
        endpoint: `http://localhost:8090/smogon/${year}/${month}/${gen}/${format}/${rank}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
            MetagameActions.FETCH_METAGAME_DATA_REQUEST,
            MetagameActions.FETCH_METAGAME_DATA_SUCCESS,
            MetagameActions.FETCH_METAGAME_DATA_FAILURE,
        ]
    };

    store.dispatch(createAction(request));
};

export default metagameMiddleware;
