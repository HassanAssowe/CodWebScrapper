import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Login from './components/login'
import UserInfo from './components/UserInfo'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/UserInfo" component={UserInfo} />
      <Route exact path="/" component={Login} />
      <Route path="*" component={Login} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing, document.getElementById('root')
)