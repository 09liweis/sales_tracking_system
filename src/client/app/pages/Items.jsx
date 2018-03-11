import React from 'react';
import $ from 'jquery';

import {
    TextField,
    Button,
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
            search: ''
        };
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount() {
        this.getItems();
    }
    getItems() {
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
    searchItem(v, e) {
        this.setState({
            search: v
        });
    }
    deleteItem(id) {
        const _this = this;
        $.ajax({
            url: '/controllers/items.php?action=deleteItem',
            method: 'POST',
            data: {id: id},
            success(res) {
                _this.getItems();
            }
        });
    }
    render() {
        const {items, search} = this.state;
        const _this = this;
        const list = items.map((item) => 
            {
                if (item.name.indexOf(search) != -1) {
                    return (<TableRow key={item.id}>
                        <TableColumn>{item.name}</TableColumn>
                        <TableColumn>{item.description}</TableColumn>
                        <TableColumn>{item.cost}</TableColumn>
                        <TableColumn>{item.retail}</TableColumn>
                        <TableColumn>{item.quantity}</TableColumn>
                        <TableColumn>{item.total_cost}</TableColumn>
                        <TableColumn>{item.total_retail}</TableColumn>
                        <TableColumn>
                            <Button flat secondary swapTheming><Link to={`/item/${item.id}/edit`}>Edit</Link></Button>
                            <Button flat secondary swapTheming onClick={_this.deleteItem.bind(_this, item.id)}>删除商品</Button>
                        </TableColumn>
                    </TableRow>);
                }
            }
        );
        return (
            <div>
            <Button flat primary swapTheming><Link to="/item/add">添加商品新品种</Link></Button>
            
            <TextField
                id="floating-center-title"
                label="搜索商品"
                lineDirection="center"
                className="md-cell md-cell--bottom"
                onChange={this.searchItem.bind(this)}
            />
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