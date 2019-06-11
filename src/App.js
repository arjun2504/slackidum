import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import ChatWindow from './components/chat/ChatWindow';
import AddContact from './components/chat/AddContact';
import AddToGroup from './components/chat/AddToGroup';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path={["/chat/:username", "/chat", "/group/:group", "/group"]} component={ChatWindow} />
        <Route path="/group/:group" component={ChatWindow} />
        <Route path="/add-contact" component={AddContact} />
        <Route path="/add-group" component={AddToGroup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
