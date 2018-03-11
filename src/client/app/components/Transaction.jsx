import React from 'react';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md';
import { Link } from 'react-router-dom';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const c = this.props.c;
        var items = null;
        if (c.item_name != '') {
            items = JSON.parse(c.item_name).map((item) =>
                <p key={item.id}>{item.name} X {item.sales_quantity}</p>
            );   
        }
        return(
            <TableRow key={c.id}>
                <TableColumn>{c.date}</TableColumn>
                <TableColumn>{c.location}</TableColumn>
                <TableColumn>{items}</TableColumn>
                <TableColumn>{c.quantity}</TableColumn>
                <TableColumn>{c.payment}</TableColumn>
                <TableColumn>{c.cost}</TableColumn>
                <TableColumn>{c.shipping_fee}</TableColumn>
                <TableColumn>{c.packaging}</TableColumn>
                <TableColumn className={(c.profit_or_loss < 0) ? 'has-text-danger' : ''}>{c.profit_or_loss}</TableColumn>
                <TableColumn>{c.status == '0' ? '已发货' : '已收货'}</TableColumn>
                <TableColumn>{c.remarks}</TableColumn>
                <TableColumn>
                    <Button flat secondary swapTheming><Link to={`/transaction/edit/${c.id}`} className="button is-danger">修改交易</Link></Button>
                </TableColumn>
            </TableRow>
        );
    }
}

export default Transaction;