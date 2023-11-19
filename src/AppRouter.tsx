import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginCallback from './spotify/LoginCallback';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login-callback">
          <LoginCallback />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
