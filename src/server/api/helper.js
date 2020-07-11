export function attributePairsToObject(pairs) {
    let attributes = {};

    pairs
        .filter((aPair) => { return aPair.Name !== 'created'; })
        .forEach((pair) => {
            if (!attributes[pair.Name]) attributes[pair.Name] = pair.Value;
        })

    return attributes;
}

export function unique(value, index, self) {
    return self.indexOf(value) === index;
}
