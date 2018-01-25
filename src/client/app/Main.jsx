import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Form from './pages/Form.jsx';
import Items from './pages/Items.jsx';

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/transactions' component={Home}/>
      <Route path='/transaction/add' component={Form}/>
      <Route path='/transaction/edit/:id' render={(props) => <Form {...props}/>}/>
      <Route path='/items' component={Items}/>
    </Switch>
  </main>
);

export default Main;