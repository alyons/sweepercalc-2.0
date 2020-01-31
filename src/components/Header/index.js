import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Dropdown } from 'react-bootstrap'

import { MetagameActions } from '../../actions';

const mapStateToProps = state => ({
    year: state.metagame.year,
    month: state.metagame.month,
    gen: state.metagame.gen,
    format: state.metagame.format,
    rank: state.metagame.rank,
    keys: state.metagame.keys
});

const mapDispatchToProps = dispatch => ({
    selectYear: year => {
        dispatch(MetagameActions.selectYear(year));
    },
    selectMonth: month => {
        dispatch(MetagameActions.selectMonth(month));
    },
    selectGen: gen => {
        dispatch(MetagameActions.selectGen(gen));
    },
    selectFormat: format => {
        dispatch(MetagameActions.selectFormat(format));
    },
    selectRank: rank => {
        dispatch(MetagameActions.selectRank(rank));
    }
});

const Header = ({ year, month, gen, format, rank, keys, selectYear, selectMonth, selectGen, selectFormat, selectRank }) => {

    let yearItems = keys.years.filter(i => i !== year)
                        .map(j => <Dropdown.Item key={j} onClick={() => selectYear(j)}>{j}</Dropdown.Item>)

    let monthItems = keys.months.filter(i => i !== rank)
                        .map(j => <Dropdown.Item key={j} onClick={() => selectMonth(j)}>{j}</Dropdown.Item>)

    let genItems = keys.gens.filter(i => i !== rank)
                        .map(j => <Dropdown.Item key={j} onClick={() => selectGen(j)}>{j}</Dropdown.Item>)

    let formatItems = keys.formats.filter(i => i !== rank)
                        .map(j => <Dropdown.Item key={j} onClick={() => selectFormat(j)}>{j}</Dropdown.Item>)

    let rankItems = keys.ranks.filter(i => i !== rank)
                        .map(j => <Dropdown.Item key={j} onClick={() => selectRank(j)}>{j}</Dropdown.Item>)

    return (
        <div>
            <ButtonToolbar>
            <Dropdown>
                <Dropdown.Toggle>{year}</Dropdown.Toggle>
                <Dropdown.Menu>{yearItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle>{month}</Dropdown.Toggle>
                <Dropdown.Menu>{monthItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle>{gen}</Dropdown.Toggle>
                <Dropdown.Menu>{genItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle>{format}</Dropdown.Toggle>
                <Dropdown.Menu>{formatItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle>{rank}</Dropdown.Toggle>
                <Dropdown.Menu>{rankItems}</Dropdown.Menu>
            </Dropdown>
            </ButtonToolbar>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
