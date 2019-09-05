import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from "../src/context/auth-context";

const App = props => {
  const authContext = useContext(AuthContext);
  
  const renderApp = () => {
    if (authContext.isAuthenticated) {
      return <Ingredients />
    }
    return <Auth />
  }

  return renderApp();
};

export default App;
