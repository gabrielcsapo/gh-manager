import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './main';
import Manage from './manage';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ Main }/>
      <Route exact path='/manage' component={ Manage }/>
    </Switch>
  </BrowserRouter>
);
