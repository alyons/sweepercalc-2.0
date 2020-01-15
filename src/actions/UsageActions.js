export const GET_POKEMON = 'GET_POKEMON';

export function getPokemon(name) {
    return { type: GET_POKEMON, name };
}