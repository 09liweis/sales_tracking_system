import React from 'react';
import $ from 'jquery';

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
            <Transaction key={c.id} c={c} />
        );
        return (
            <div>
                <h2>Today: {totalToday}</h2>
                <h2>This Month: {totalMonth}</h2>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>买家所在地</th>
                            <th>出售商品</th>
                            <th>数量</th>
                            <th>买家付款</th>
                            <th>成本</th>
                            <th>运费</th>
                            <th>包装</th>
                            <th>盈亏</th>
                            <th>状态</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Customers;