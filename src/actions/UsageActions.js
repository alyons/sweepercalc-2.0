export const GET_POKEMON = 'GET_POKEMON';
export const SELECT_POKEMON = 'SELECT_POKEMON';

export function getPokemon(name) {
    return { type: GET_POKEMON, name };
}

export function selectPokemon(name) {
    return { type: SELECT_POKEMON, name };
}
