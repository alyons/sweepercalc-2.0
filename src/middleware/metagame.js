import { createAction } from 'redux-api-middleware';

import { MetagameActions } from '../actions';

const actionWhiteList = [
    MetagameActions.SELECT_RANK
];

const metagameMiddleware = (store) => (next) => (action) => {
    next(action);

    if (!actionWhiteList.includes(action.type)) return;
    const state = store.getState();
    const { year, month, gen, format, rank } = state.metagame;
    // const location = window.location;
    const request = {
        endpoint: `http://localhost:8090/smogon/${year}/${month}/${gen}/${format}/${rank}`,
        method: 'GET',
        types: [
            MetagameActions.FETCH_METAGAME_DATA_REQUEST,
            MetagameActions.FETCH_METAGAME_DATA_SUCCESS,
            MetagameActions.FETCH_METAGAME_DATA_FAILURE,
        ]
    };

    createAction(request);
};

export default metagameMiddleware;
