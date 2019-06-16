import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Footer from './components/layout/Footer';
import ChatWindow from './components/chat/ChatWindow';
import AddContact from './components/chat/AddContact';
import AddToGroup from './components/chat/AddToGroup';
import Logout from './components/auth/Logout';
import PrivateRoute from './components/auth/PrivateRoute';
import history from './history';

const App = (props) => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path={["/chat/:username", "/chat", "/group/:group", "/group"]} component={ChatWindow} />
          {/* <PrivateRoute path="/group/:group" component={ChatWindow} /> */}
          <PrivateRoute path="/add-contact" component={AddContact} />
          <PrivateRoute path="/add-group" component={AddToGroup} />
          <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
