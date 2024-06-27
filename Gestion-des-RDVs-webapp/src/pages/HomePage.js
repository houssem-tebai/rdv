import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
//pages
import Login from './Login';
import Notfound from '../components/Notfound';
import Dashboard from './Dashboard';
import ChangePassword from './ChangePassword';
import FormRDV from './FormRDV';
import AgentHomepage from './AgentHomepage';
import ListUsers from './users/ListUsers';
import CreerUser from './users/CreerUser';
import ModifierUser from './users/ModifierUser';
import AuthContext from '../context/AuthProvider';

import AdminHomepage from './AdminHomepage';
import ListRdvAdmin from './ListRdvAdmin';
import Accueil from './Accueil';
// const RouteWithLoader = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
//   );
// };

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  // Here, you can integrate your authentication logic
  const { auth } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <>
            <Sidebar />
            <main className="content">
              <Navbar />
              <Component {...props} />
            </main>
          </>
        ) : (
          <Redirect to={Routes.Login.path} />
        )
      }
    />
  );
};

export default () => (
  <Switch>

    <Route exact path={Routes.FormRDV.path} component={FormRDV} />
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
    <RouteWithSidebar exact path={Routes.AgentHomepage.path} component={AgentHomepage} />
    <RouteWithSidebar exact path={Routes.AdminHomepage.path} component={AdminHomepage} />
    <RouteWithSidebar exact path={Routes.ListUsers.path} component={ListUsers} />
    <RouteWithSidebar exact path={Routes.CreerUser.path} component={CreerUser} />
    <RouteWithSidebar exact path={Routes.ModifierUser.path} component={ModifierUser} />

    <RouteWithSidebar exact path={Routes.ListRdvAdmin.path} component={ListRdvAdmin} />
    <Route exact path={Routes.Login.path} component={Login} />
    <Route exact path={Routes.NotFound.path} component={Notfound} />
    <Route exact path={Routes.ChangePassword.path} component={ChangePassword} />
    <Route exact path={Routes.Accueil.path} component={Accueil} />

  


    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
