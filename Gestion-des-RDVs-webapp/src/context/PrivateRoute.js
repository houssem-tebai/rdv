import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);
    
    return (
        <Route
            {...rest}
            render={props =>
                auth && auth.token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;