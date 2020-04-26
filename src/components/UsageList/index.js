import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { UsageActions } from '../../actions';
import './UsageList.css'

const mapStateToProps = state => ({
    pokemonList: state.usage.list.map((p, i) =>{ return  { name: p.name, usage: p.usage, rank: i } })
});

const mapDispatchToProps = dispatch => ({
    selectPokemon: pokemon => {
        dispatch(UsageActions.selectPokemon(pokemon));
    }
});

const UsageList = ({ pokemonList, selectPokemon }) => {
    let tableItems = pokemonList.map(p => (<tr key={p.name} onClick={() => selectPokemon(p.name)}><td>{p.rank}</td><td>{p.name}</td><td>{(p.usage * 100).toFixed(2)+'%'}</td></tr>));

    return (
        <Table className="UsageList">
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

export default connect(mapStateToProps, mapDispatchToProps)(UsageList);
