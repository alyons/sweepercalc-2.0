import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import DetailsTable from './DetailsTable';

const usageComparison = (a, b) => b.usage - a.usage;

const getUsage = (value) => value;
const sumUsage = (acc, cur) => acc + Math.abs(cur.usage);

const mapStateToProps = state => ({
    data: state.usage.selectedPokemon
});

const generateDataArray = (source, key, formatUsage = getUsage) => {
    let names = Array.from(Object.keys(source[key]));
    let rawItems = names.map(name => { return { name, usage: formatUsage(source[key][name]) } });
    rawItems.sort(usageComparison);
    let total = rawItems.reduce(sumUsage, 0);
    rawItems.forEach(item => {
        item.percentage = item.usage / total * 100;
    });
    return rawItems;
};

const generateUsageTableBody = (source, key, limitPercent = 1.0, skipOther = true, formatUsage = getUsage) => {
    let names = Array.from(Object.keys(source[key]));
    let rawItems = names.map(name => { return { name, usage: formatUsage(source[key][name]) } });
    let tableBody = [];
    rawItems.sort(usageComparison);
    let total = rawItems.reduce(sumUsage, 0);
    rawItems.forEach(item => {
        item.percentage = item.usage / total * 100;
    });

    // Filter out items that are less than 1%
    let items = [];
    if (key !== 'Abilities') {
        items = rawItems.filter(item => item.percentage > limitPercent);
        let smallItems = rawItems.filter(item => item.percentage <= limitPercent);
        if (smallItems.length < 2) {
            items = items.concat(smallItems);
        } else {
            let smallTotal = smallItems.reduce(sumUsage, 0);
            items.push({ name: 'Other', usage: smallTotal, percentage: (smallTotal / total * 100) });
        }
    } else {
        items = rawItems;
    }

    items.forEach(item => {
        tableBody.push(
            <tr key={item.name}><td>{item.name}</td><td>{(item.percentage.toFixed(3)+'%')}</td></tr>
        );
    });
    return tableBody;
};

const Details = ({ data }) => {
    // console.log(data['Checks and Counters']);
    let getUsageChecks = (value) => value[0];


    let abilityTableProps = {
        name: 'Ability',
        items: generateDataArray(data, 'Abilities')
    };
    
    // Get Table Data
    let checksTable = generateUsageTableBody(data, 'Checks and Counters', 1.0, false, getUsageChecks);
    let itemTable = generateUsageTableBody(data, 'Items');
    let moveTable = generateUsageTableBody(data, 'Moves');
    let spreadTable = generateUsageTableBody(data, 'Spreads', 2.5);
    let teammatesTable = generateUsageTableBody(data, 'Teammates');

    return (
        <div>
            <DetailsTable {...abilityTableProps} />
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
