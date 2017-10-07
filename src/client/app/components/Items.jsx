import React from 'react';
import $ from 'jquery';

class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: '/controllers/items.php?action=getItems',
            success(res) {
                _this.setState({
                    items: res
                });
            }
        });
    }
    render() {
        const items = this.state.items;
        const list = items.map((item) => 
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.cost}</td>
                <td>{item.retail}</td>
                <td>{item.quantity}</td>
                <td>{item.total_cost}</td>
                <td>{item.total_retail}</td>
            </tr>
        );
        return (
            <table className="table is-fullwidth is-striped is-narrow">
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>描述</th>
                        <th>成本价</th>
                        <th>零售价</th>
                        <th>一件多少包</th>
                        <th>总成本</th>
                        <th>总零售</th>
                    </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
        );
    }
}

export default Items;