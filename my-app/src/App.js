import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Product from './components/Product';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import Inventory from './components/Inventory';
import Cart from './components/Cart';
import CreateProduct from './components/CreateProduct';
import CreateCart from './components/CreateCart';
import CreateInventory from './components/CreateInventory';
import UpdateProduct from './components/UpdateProduct';
import UpdateInventory from './components/UpdateInventory'
import User from './components/User'
import CreateUser from './components/CreateUser'

function App() {
  return (

    <div>
      <Router>
      <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/Product" component={Product} />
      <Route path="/Inventory" component={Inventory} />
      <Route path="/Cart" component={Cart} />
      <Route path="/User" component={User} />
      <Route path="/createUser" component={CreateUser} />
      <Route path="/createProduct" component={CreateProduct} />
      <Route path="/createCart" component={CreateCart} />
      <Route path="/CreateInventory" component={CreateInventory} />
      <Route path="/UpdateProduct/:_id" component={UpdateProduct} />
      <Route path="/UpdateInventory/:_id" component={UpdateInventory} />
      
      </Switch>
      </Router>

    </div>

  );
}

export default App;
