// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import ReactDOM from 'react-dom';

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Routes } from './routes';
import CreerUser from './pages/users/CreerUser';
import AgentHomepage from './pages/AgentHomepage';
import Dashboard from './pages/Dashboard';
import ListUsers from './pages/users/ListUsers';
import ModifierUser from './pages/users/ModifierUser';
import AdminHomepage from './pages/AdminHomepage';
import ListRdvAdmin from './pages/ListRdvAdmin';
import PrivateRoute from './context/PrivateRoute';
import Login from './pages/Login';
import NotFound from './components/Notfound';
import Accueil from './pages/Accueil';
import FormRDV from './pages/FormRDV';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>

                <Switch>
                <Route exact path="/" component={Accueil} /> {/* Default route to Accueil */}
                    <Route path={Routes.Login.path} component={Login} />
                    <HomePage>
          <PrivateRoute path={Routes.CreerUser.path} component={CreerUser} />
          <PrivateRoute path={Routes.AgentHomepage.path} component={AgentHomepage} />
          <PrivateRoute path={Routes.ListUsers.path} component={ListUsers} />
          <PrivateRoute path={Routes.ModifierUser.path} component={ModifierUser} />
          <PrivateRoute path={Routes.AdminHomepage.path} component={AdminHomepage} />
          <PrivateRoute path={Routes.ListRdvAdmin.path} component={ListRdvAdmin} />
        </HomePage>

                    <Route path={Routes.FormRDV.path} component={FormRDV} /> {/* Publicly accessible route */}
                    <Route path={Routes.NotFound.path} component={NotFound} />
                </Switch>
        </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
