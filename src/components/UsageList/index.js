import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const mapStateToProps = state => ({
    pokemonList: state.usage.list.map((p, i) =>{ return  { name: p.name, usage: p.usage, rank: i } })
});

const UsageList = ({ pokemonList }) => {
    let tableItems = pokemonList.map(p => (<tr key={p.name}><td>{p.rank}</td><td>{p.name}</td><td>{(p.usage * 100).toFixed(2)+'%'}</td></tr>));
    return (
        <Table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Pokemon</th>
                    <th>Usage</th>
                </tr>
            </thead>
            <tbody>
                {tableItems}
            </tbody>
        </Table>
    );
};

export default connect(mapStateToProps)(UsageList);
