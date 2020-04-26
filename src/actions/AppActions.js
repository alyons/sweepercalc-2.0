export const SET_ACTIVE_BREAKPOINT = 'SET_ACTIVE_BREAKPOINT';
export const SET_VIEW = 'SET_VIEW';
export const VIEWS = {
    default: 'DEFAULT',
    details: 'DETAILS'
}

export function setActiveBreakpoint(name, size) {
    return { type: SET_ACTIVE_BREAKPOINT, name, size };
}

export function setView(view) {
    return { type: SET_VIEW, view };
}
