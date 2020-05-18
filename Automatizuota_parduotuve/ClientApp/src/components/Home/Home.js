import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from '../../authContext';
import Login from './Login';

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/items" />
      ) : (
        <div>
          <h2>Sveiki atvykę į automatizuotą parduotuvę.</h2>
          <Login />
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;