import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import SplashPage from './components/SplashPage';
import ServerPage from './components/Server';
import ServerEditPage from './components/ServerEditPage';
import ChannelEditPage from './components/ChannelEditPage'
import DirectMessagePage from './components/DirectMessagePage';
import DMPage from './components/DMPage';

function App() {
  return (
    <Switch>
      <Route path="/servers/:id/edit">
        <ServerEditPage />
      </Route>
      <Route path="/channels/:id/edit">
        <ChannelEditPage />
      </Route>
      <Route path="/channels/@me/:dchannelId">
        <DMPage />
      </Route>
      <Route path="/channels/@me">
        <DirectMessagePage />
      </Route>
      <Route path="/servers/:id/:channelId">
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