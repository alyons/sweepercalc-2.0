export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_MONTH = 'SELECT_MONTH';
export const SELECT_GEN = 'SELECT_GEN';
export const SELECT_FORMAT = 'SELECT_FORMAT';
export const SELECT_RANK = 'SELECT_RANK';

export function selectYear(year) {
    return { type: SELECT_YEAR, year };
}

export function selectMonth(month) {
    return { type: SELECT_MONTH, month };
}

export function selectGen(gen) {
    return { type: SELECT_GEN, gen };
}

export function selectFormat(format) {
    return { type: SELECT_FORMAT, format };
}

export function selectRank(rank) {
    return { type: SELECT_RANK, rank };
}
