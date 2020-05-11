import React from 'react';
import logo from './logo.svg';
import NavBar from './Components/NavBar/NavBar';
import Container from './Components/Container/Container';
import NotFound from './Components/NotFound/NotFound';
import '../src/App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductPreview from './Components/ProductPreview/ProductPreview';
import Checkout from './Components/Checkout/Checkout';
import LogIn from './Components/LogIn/LogIn';
import { AuthContextProvider, PrivateRoute } from './Components/LogIn/useAuth';


function App() {
  return (
    <div >
      <AuthContextProvider>
        <NavBar></NavBar>
        <Router>
          <Switch>
            <Route exact path="/">
              <Container></Container>
            </Route>
            <Route path="/product/:productKey">
              <ProductPreview></ProductPreview>
            </Route>
            <Route path="/home">
              <Container></Container>
            </Route>
            < PrivateRoute path="/checkout">
              <Checkout></Checkout>
            </ PrivateRoute>
            <Route path="/logIn">
              <LogIn></LogIn>
            </Route>
            <Route to="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
