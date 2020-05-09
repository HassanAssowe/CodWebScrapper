import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Login from './components/login'
import UserInfo from './components/UserInfo'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/userInfo" components={UserInfo} />
    </div>
  </Router>
)

ReactDOM.render(
  routing, document.getElementById('root')
)