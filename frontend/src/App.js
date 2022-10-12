import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/">
        <HomePage /> 
      </Route>
    </Switch>
  );
}

export default App;