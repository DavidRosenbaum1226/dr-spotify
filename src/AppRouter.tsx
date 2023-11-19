// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import LoginCallback from './LoginCallback';
import ErrorPage from './ErrorPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login-callback">
          <LoginCallback />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
