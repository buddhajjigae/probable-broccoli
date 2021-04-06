import React, { useState, useEffect } from 'react';
import SignIn from '../SignIn';
import {Router, Route} from 'react-router';

export const GlobalContext = React.createContext({}); // To pass state to children
function Login(props) {
    return (
      <div>
       <SignIn></SignIn>
      </div>
    )
}

export default Login;