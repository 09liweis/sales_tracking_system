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
        var status = '未发货';
        switch (c.status) {
            case '0':
                status = '未发货';
                break;
            case '1':
                status = '已发货';
                break;
            case '2':
                status = '已收货';
                break;
        }
        const total = parseFloat(c.payment) + parseFloat(c.other_fee);
        return(
            <TableRow key={c.id}>
                <TableColumn>{c.date}</TableColumn>
                <TableColumn>{c.location}</TableColumn>
                <TableColumn>
                    <div className="transaction__quantity">购买数量: {c.quantity}</div>
                    {items}
                </TableColumn>
                <TableColumn>
                    <div>总数: {total}</div>
                    <div>买家付款: {c.payment}</div>
                    <div>其他费用: {c.other_fee}</div>
                </TableColumn>
                <TableColumn>{c.cost}</TableColumn>
                <TableColumn>
                    <div>运费: {c.shipping_fee}</div>
                    <div>包装: {c.packaging}</div>
                </TableColumn>
                <TableColumn className={(c.profit_or_loss < 0) ? 'has-text-danger' : ''}>{c.profit_or_loss}</TableColumn>
                <TableColumn>{status}</TableColumn>
                <TableColumn>
                    <Button flat secondary swapTheming className="action__button"><Link to={`/transaction/edit/${c.id}`} className="button is-danger">修改交易</Link></Button>
                    <Button flat secondary swapTheming className="action__button" onClick={this.props.removeTransaction.bind(this, c.id)}>删除交易</Button>
                </TableColumn>
            </TableRow>
        );
    }
}

export default Transaction;