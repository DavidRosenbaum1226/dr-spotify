import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginCallback from './spotify/LoginCallback';
import ErrorPage from './ErrorPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <App />
        </Route>
        <Route path="/login-callback">
          <LoginCallback />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
