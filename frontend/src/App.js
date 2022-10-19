import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import SplashPage from './components/SplashPage';
import ServerPage from './components/Server';

function App() {
  return (
    <Switch>
      <Route path="/servers/:id">
        <ServerPage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/">
        <SplashPage /> 
      </Route>
    </Switch>
  );
}

export default App;