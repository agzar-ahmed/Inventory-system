import React from 'react'
import './App.css';
import SideBar from './component/SideBar';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Product from './pages/Product'
import ErrorPage from './pages/ErrorPage';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Regiter'
import IncomingPurchase from './pages/IncomingPurchases'

import { BrowserRouter as Router, Route, Switch} 
from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      
          <Switch>
              <Route exact path="/">
                     <div className="container">
                          <SideBar/>
                          <Home/>
                    </div>
              </Route>  
              <Route exact path="/login">
                     <div className="container">
                          <Login/>
                    </div>
              </Route>
              <Route exact path="/register">
                     <div className="container">
                          <Register/>
                    </div>
              </Route>
              <Route exact path="/userslist">
                     <div className="container">
                          <SideBar/>
                          <Users/>
                    </div>
              </Route>  
              <Route exact path="/user">
                   
                     <div className="container">
                          <SideBar/>
                          <User/>
                    </div>
              </Route>  
              <Route exact path="/incomingpurchase">
                     <div className="container">
                          <SideBar/>
                          <IncomingPurchase/>
                    </div>
              </Route> 
              {/* <Route exact path="/product">
                     <div className="container">
                          <SideBar/>
                          <Product/>
                    </div>
              </Route>   */}
              <Route exact path="/productlist">
                     <div className="container">
                          <SideBar/>
                          <ProductList/>
                    </div>
              </Route>
              {/* <Route path="*" component={ErrorPage}/> */}
          </Switch>      
    </div>
    </Router>
  );
}

export default App;
