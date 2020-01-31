import sample from './metagames.json';
import { MetagameActions } from '../actions';

const map = sample;

const initialState = {
    year: '2019',
    month: '12',
    gen: '8',
    format: 'ou',
    rank: '1825',
    keys: {
        years: Array.from(Object.keys(map)),
        months: Array.from(Object.keys(map['2019'])),
        gens: Array.from(Object.keys(map['2019']['12'])),
        formats: Array.from(Object.keys(map['2019']['12']['8'])),
        ranks: Array.from(Object.keys(map['2019']['12']['8']['ou']))
    }
};


const actionTypeToNumber = (type) => {
    switch(type) {
        case MetagameActions.SELECT_YEAR: return 0;
        case MetagameActions.SELECT_MONTH: return 1;
        case MetagameActions.SELECT_GEN: return 2;
        case MetagameActions.SELECT_FORMAT: return 3;
        case MetagameActions.SELECT_RANK: return 4;
        default: return Number.MAX_SAFE_INTEGER;
    }
};

const metagame = (state = initialState, action) => {
    let { year, month, gen, format, rank, keys } = state;
    
    let order = actionTypeToNumber(action.type);

    if (order <= actionTypeToNumber(MetagameActions.SELECT_YEAR)) {
        year = action.year;
        keys.months = Array.from(Object.keys(map[year]));
        action.month = keys.months[keys.months.length - 1];
    }

    if (order <= actionTypeToNumber(MetagameActions.SELECT_MONTH)) {
        month = action.month;
        keys.gen = Array.from(Object.keys(map[year][month]));
        action.gen = keys.gen[keys.gen.length - 1];
    }

    if (order <= actionTypeToNumber(MetagameActions.SELECT_GEN)) {
        gen = action.gen;
        keys.formats = Array.from(Object.keys(map[year][month][gen]));
        action.format = 'ou';
    }

    if (order <= actionTypeToNumber(MetagameActions.SELECT_FORMAT)) {
        format = action.format;
        keys.ranks = Array.from(Object.keys(map[year][month][gen][format]));
        action.rank = keys.ranks[keys.ranks.length - 1];
    }

    if (order <= actionTypeToNumber(MetagameActions.SELECT_RANK)) {
        rank = action.rank;
    }

    return Object.assign({}, state, { year, month, gen, format, rank });
};

export default metagame;