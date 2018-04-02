import React from 'react';
import $ from 'jquery';

import {TextField,Button,Grid,Cell,Card, CardTitle, CardText} from 'react-md';

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
            <div style={{maxWidth: '768px', margin: 'auto',width: '100%'}}>
                <h1>Todo List</h1>
                <Grid>
                    <Cell size={6}>
                        <Card>
                            <CardTitle title="Ticket Title" subtitle="on going" />
                            <CardText>This is description</CardText>
                        </Card>
                        <Card>
                            <CardTitle title="Ticket Title" subtitle="on going" />
                            <CardText>This is description</CardText>
                        </Card>
                    </Cell>
                    <Cell size={6}>
                        <Card>
                            <CardTitle title="Ticket Title" subtitle="done" />
                            <CardText>This is description</CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default TodoList;