import React, { PureComponent } from 'react';
import { Table } from 'react-bootstrap';

class DetailsTable extends PureComponent {
    render() {
        const {
            name,
            items
        } = this.props;

        let tableItems = items.map(item => <tr key={item.name}><td>{item.name}</td><td>{(item.percentage.toFixed(3)+'%')}</td></tr>);

        return (
            <Table>
                <thead>
                    <tr><th>{name}</th><th>Usage</th></tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
        );
    }
}

export default DetailsTable;