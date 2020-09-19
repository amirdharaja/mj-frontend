import React from "react";
import { Route } from "react-router-dom";

import Product from './components/Products';
import Home from "./components/Home";
import CartList from './components/cart/CartList'
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Footer from './containers/Footer';
import Item from './components/Item';
import Setting from './components/Setting';
import ContactPopUp from './containers/ContactPopUp';



const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/products" component={Product}></Route>
    <Route path="/cart" component={CartList}></Route>
    <Route path="/checkout" component={Checkout}></Route>
    <Route path="/orders" component={Order}></Route>
    <Route path="/:categoryId/:catgorySlug/:itemId/" component={Item}></Route>
    <Route path="/account/profile" component={Setting}></Route>

    <Route path="*" component={Footer}></Route>
    <Route path="*" component={ContactPopUp}></Route>
  </div>
);

export default BaseRouter;