import React from 'react';
import $ from 'jquery';

import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import { Link } from 'react-router-dom';

class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
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
            <TableRow key={item.id}>
                <TableColumn>{item.name}</TableColumn>
                <TableColumn>{item.description}</TableColumn>
                <TableColumn>{item.cost}</TableColumn>
                <TableColumn>{item.retail}</TableColumn>
                <TableColumn>{item.quantity}</TableColumn>
                <TableColumn>{item.total_cost}</TableColumn>
                <TableColumn>{item.total_retail}</TableColumn>
                <TableColumn><Link to={`/item/${item.id}/edit`}>Edit</Link></TableColumn>
            </TableRow>
        );
        return (
            <div>
            <Link to="/item/add">添加商品</Link>
            <DataTable plain>
                <TableHeader>
                    <TableRow>
                        <TableColumn>名字</TableColumn>
                        <TableColumn>描述</TableColumn>
                        <TableColumn>成本价</TableColumn>
                        <TableColumn>零售价</TableColumn>
                        <TableColumn>一件多少包</TableColumn>
                        <TableColumn>总成本</TableColumn>
                        <TableColumn>总零售</TableColumn>
                        <TableColumn>Action</TableColumn>
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

export default Items;