import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import Items from './components/Items.jsx';

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/items' component={Items}/>
    </Switch>
  </main>
);

export default Main;