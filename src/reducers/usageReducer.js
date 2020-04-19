import sample from './gen8ou-1825.json';
import { UsageActions, MetagameActions } from '../actions';

const initialState = {
    selectedPokemon: undefined,
    list: []
};

let names = Array.from(Object.keys(sample.data));
names.forEach(name => {
    initialState.list.push(Object.assign({}, sample.data[name], { name }));
});
const usageComparison = (a, b) => b.usage - a.usage;
initialState.list.sort(usageComparison);
initialState.selectedPokemon = initialState.list[0];

const usage = (state = initialState, action) => {
    switch (action.type) {
        case UsageActions.GET_POKEMON:
            return state.list.find(p => p.name === action.name);
        case UsageActions.SELECT_POKEMON: {
            const selectedPokemon = state.list.find(p => p.name === action.name);
            return (selectedPokemon !== undefined) ? Object.assign({}, state, { selectedPokemon }) : state;
        }
        case MetagameActions.FETCH_METAGAME_DATA_SUCCESS: {
            console.log('Fetched data successfully');
            state.list = [];
            let names = Array.from(Object.keys(action.payload.data));
            names.forEach(name => {
                state.list.push(Object.assign({}, action.payload.data[name], { name }));
            });
            state.list.sort(usageComparison);
            state.selectedPokemon = state.list[0];
            return state;
        }
        default:
            return state;
    }
};

export default usage;
