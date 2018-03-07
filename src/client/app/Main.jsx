import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import TransactionForm from './pages/TransactionForm.jsx';
import Items from './pages/Items.jsx';
import ItemForm from './pages/ItemForm.jsx';

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/transactions' component={Home}/>
      <Route path='/transaction/add' component={TransactionForm}/>
      <Route path='/transaction/edit/:id' render={(props) => <TransactionForm {...props}/>}/>
      <Route path='/items' component={Items}/>
      <Route path='/item/add' component={ItemForm}/>
      <Route path='/item/:id/edit' render={(props) => <ItemForm {...props}/>}/>
    </Switch>
  </main>
);

export default Main;