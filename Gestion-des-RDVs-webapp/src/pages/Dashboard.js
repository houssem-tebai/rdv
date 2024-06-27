import React from 'react'
import AuthContext from '../context/AuthProvider';

function Dashboard() {
    const { auth } = React.useContext(AuthContext);

    return (
        <div>
          {auth && auth.username ? (
            <div>
              <h1>Hello {auth.username}</h1>
              <p>Role: {auth.role}</p>
              <p>Email: {auth.email}</p>
              <p>Etat: {auth.statut}</p>

            </div>
          ) : (
            <h1>Hi SuperAdmin</h1>
          )}
        </div>
      );
          }

export default Dashboard
