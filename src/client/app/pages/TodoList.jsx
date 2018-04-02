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

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
        };
    }
    componentDidMount() {
    }
    
    render() {
        
        return (
            <div>
                <h1>Todo List</h1>
                <h2>Coming Soon</h2>
            </div>
        );
    }
}

export default TodoList;