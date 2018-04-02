import React from 'react';
import $ from 'jquery';

import {TextField,Button,Grid,Cell,Card, CardTitle, CardText} from 'react-md';

import { Link } from 'react-router-dom';

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            ticket: {
                id: 0,
                name: '',
                description: '',
                status: 'pending',
                category: 'feature'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const _this= this;
        $.ajax({
            url: '/controllers/tickets.php?action=getAll',
            method: 'GET',
            success(res) {
                _this.setState({
                    todos: res
                });
            }
        });
    }
    handleChange(v, e) {
        let ticket = this.state.ticket;
        const p = e.target.name;
        ticket[p] = v;
        this.setState({
            ticket: ticket
        });
    }
    handleSubmit(ticket) {
        const _this = this;
        $.ajax({
            url: '/controllers/tickets.php?action=upsert',
            data: ticket,
            method: 'POST',
            success(res) {
                if (res) {
                    _this.setState({
                        id: 0,
                        name: '',
                        description: '',
                        status: 'pending',
                        category: 'feature'
                    });
                }
            }
        });
    }
    render() {
        const newTicket = this.state.ticket;
        const tickets = this.state.todos.map((t) => {
            return (
                <Card className="ticket">
                    <CardTitle title={t.name} subtitle={t.status} />
                    <CardText>{t.description}</CardText>
                </Card>
            );
        });
        return (
            <div style={{maxWidth: '768px', margin: 'auto',width: '100%'}}>
                <h1>Todo List</h1>
                <Grid>
                    <Cell size={6}>
                        {tickets}
                        <Card className="ticket">
                            <CardTitle title="" subtitle="">
                                <TextField id="title" label="New Ticket Title" name="name" onChange={this.handleChange} />
                            </CardTitle>
                            <CardText>
                                <TextField id="description" label="description" name="description" rows={2} onChange={this.handleChange} />
                            </CardText>
                            <Button flat secondary swapTheming onClick={this.handleSubmit.bind(this, newTicket)}>Create</Button>
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