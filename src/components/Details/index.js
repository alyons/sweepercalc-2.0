import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const usageComparison = (a, b) => b.usage - a.usage;

const mapStateToProps = state => ({
    data: state.usage.selectedPokemon
});

const generateUsageTableBody = (source, key, limit = 0) => {
    let names = Array.from(Object.keys(source[key]));
    let items = names.map(name => { return { name, usage: source[key][name] } });
    let tableBody = [];
    items.sort(usageComparison);
    if (limit > 0) {
        items = items.slice(0, limit);
    }
    items.forEach(item => {
        tableBody.push(
            <tr key={item.name}><td>{item.name}</td><td>{item.usage}</td></tr>
        );
    });
    return tableBody;
};

const Details = ({ data }) => {
    console.log(data['Checks and Counters']);
    
    // Get Table Data
    let abilityTable = generateUsageTableBody(data, 'Abilities');
    let checksTable = generateUsageTableBody(data, 'Checks and Counters', 10);
    let itemTable = generateUsageTableBody(data, 'Items', 10);
    let moveTable = generateUsageTableBody(data, 'Moves', 10);
    let spreadTable = generateUsageTableBody(data, 'Spreads', 10);
    let teammatesTable = generateUsageTableBody(data, 'Teammates', 10);

    return (
        <div>
            <Table>
                <thead>
                    <tr><th>Ability</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {abilityTable}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr><th>Item</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr><th>Spread</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {spreadTable}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr><th>Move</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {moveTable}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr><th>Teammate</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {teammatesTable}
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr><th>Check or Counter</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {checksTable}
                </tbody>
            </Table>
        </div>
    );
};

export default connect(mapStateToProps)(Details);
