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
    getStatus(code) {
        let status = '未发货';
        switch (code) {
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
        return status;
    }
    getStatusColor(code) {
        let color = '#000000';
        switch (code) {
            case '0':
                color = '#FF3D00';
                break;
            case '1':
                color = '#01579B';
                break;
            case '2':
                color = '#4CAF50';
                break;
        }
        return color;
    }
    render() {
        const c = this.props.c;
        var items = null;
        if (c.item_name != '') {
            items = JSON.parse(c.item_name).map((item) =>
                <p key={item.id}>{item.name} X {item.sales_quantity}</p>
            );   
        }
        
        const total = parseFloat(c.payment) + parseFloat(c.other_fee);
        return(
            <TableRow key={c.id}>
                <TableColumn>
                    <div><b>日期:</b> {c.date}</div>
                    <div><b>状态:</b> <span style={{color: this.getStatusColor(c.status)}}>{this.getStatus(c.status)}</span></div>
                    <div>{c.location}</div>
                </TableColumn>
                <TableColumn>
                    <div className="transaction__quantity"><b>购买数量:</b> {c.quantity}</div>
                    {items}
                </TableColumn>
                <TableColumn>
                    <div><b>总数:</b> {total}</div>
                    <div><b>买家付款:</b> {c.payment}</div>
                    <div><b>其他费用:</b> {c.other_fee}</div>
                </TableColumn>
                <TableColumn>
                    <div><b>成本:</b> {c.cost}</div>
                    <div><b>运费:</b> {c.shipping_fee}</div>
                    <div><b>包装:</b> {c.packaging}</div>
                </TableColumn>
                <TableColumn className={(c.profit_or_loss < 0) ? 'has-text-danger' : ''}>{c.profit_or_loss}</TableColumn>
                <TableColumn>
                    <Button flat secondary swapTheming className="action__button"><Link to={`/transaction/edit/${c.id}`} className="button is-danger">修改交易</Link></Button>
                    <Button flat secondary swapTheming className="action__button" onClick={this.props.removeTransaction.bind(this, c.id)}>删除交易</Button>
                </TableColumn>
            </TableRow>
        );
    }
}

export default Transaction;