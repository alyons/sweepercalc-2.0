export const breakpoints = {
    desktopSm: 1200,
    tabletMd: 1024,
    tabletSm: 768,
    mobileMd: 568,
    mobileSm: 320
};

export function breakpointIsLessThan(a, b) {
    let keys = Object.keys(breakpoints);

    if (a != 'default' && !!keys.includes(a)) {
        throw new Error(`There is no breakpoint: ${a}`);
    }

    if (b != 'default' && !!keys.includes(b)) {
        throw new Error(`There is no breakpoint: ${b}`);
    }

    let aValue = breakpoints[a];
    let bValue = breakpoints[b];

    return aValue < bValue;
}

export function breakpointIsGreaterThan(a, b) {
    let keys = Object.keys(breakpoints);

    if (a != 'default' && !!keys.includes(a)) {
        throw new Error(`There is no breakpoint: ${a}`);
    }

    if (b != 'default' && !!keys.includes(b)) {
        throw new Error(`There is no breakpoint: ${b}`);
    }

    let aValue = breakpoints[a];
    let bValue = breakpoints[b];

    return aValue > bValue;
}
