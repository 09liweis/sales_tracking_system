import React from 'react';
import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import Transaction from './components/Transaction.jsx';

class Customers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.customers
        };
    }
    sort() {
        return [].concat(this.props.customers).sort((a, b) => parseFloat(a.quantity) < parseFloat(b.quantity));
    }
    filter() {
        return [].concat(this.props.customers).filter((c) => parseInt(c.month) == 10);
    }

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        const today = year + '-' + month + '-' + day;
        const _this = this;
        const customers = this.props.customers;
        var totalToday = 0.0;
        var totalMonth = 0.0;
        customers.map((c) => {
            if (c.date == today) {
                totalToday += parseFloat(c.payment);
            }
            if (c.date.substring(0, 7) == today.substring(0, 7)) {
                totalMonth += parseFloat(c.payment);
            }
        });
        const list = customers.map((c, i) =>
            <Transaction key={c.id} c={c} removeTransaction={this.props.removeTransaction.bind(this)} />
        );
        return (
            <div>
                <h2>今日交易额: {totalToday.toFixed(2)}</h2>
                <h2>今月交易额: {totalMonth.toFixed(2)}</h2>
                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>日期</TableColumn>
                            <TableColumn>买家所在地</TableColumn>
                            <TableColumn>出售商品</TableColumn>
                            <TableColumn>数量</TableColumn>
                            <TableColumn>总数</TableColumn>
                            <TableColumn>买家付款</TableColumn>
                            <TableColumn>其他费用</TableColumn>
                            <TableColumn>成本</TableColumn>
                            <TableColumn>运费</TableColumn>
                            <TableColumn>包装</TableColumn>
                            <TableColumn>盈亏</TableColumn>
                            <TableColumn>状态</TableColumn>
                            <TableColumn>Remarks</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {list}
                    </TableBody>
                </DataTable>
            </div>
        );
    }

}

export default Customers;