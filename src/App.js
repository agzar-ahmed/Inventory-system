import React,{useState,useEffect,Fragment} from 'react'
import './App.css';
import SideBar from './component/SideBar';
import Spinner from './component/Spinner';

import Home from './pages/Home';
import UsersList from './pages/UsersList';
import User from './pages/User';
import Product from './pages/Product'
import ErrorPage from './pages/ErrorPage';
import stock from './pages/stock';
import Login from './pages/Login';
import Register from './pages/Register'
import CheckEmail from './pages/CheckEmail'
import Emailverifiaction from './pages/EmailVerification'
import SendResetPassword from './pages/sendResetPassword'
import ResetPassword from './pages/ResetPassword'
import ProductList from './pages/ProductList'
import IncomingPurchase from './pages/IncomingPurchases';
import IncomingPurchaseList from './pages/IncomingPurchaseList'


import {loadUser} from './services/authService'

import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute'

function App() {
      /***************
            In this application we tried to do authentication lacally 
            without using Redux to handel autheSntication.
      *************/
      const [ user,setUser ] = useState();
      const [ loading, setLoading ] = useState(true)

      useEffect(
            // check the token in localStorage
            //decoded jwt
            ()=>{
            async function fetchData() {
                  try {
                      const response = await loadUser()
                      setUser(response)
                      setLoading(false)
                  } catch (e) {
                      console.error(e);   
                  }
              };
            fetchData()
            }
            ,[])
  if(loading) return(<Fragment> <Spinner/> </Fragment>)          
  return (
    <Fragment>
    <div className="App">
      <div className="container">
      <Router>
            <Switch>
              <Route exact path="/">     
                  <div>Home Page to do</div>
              </Route>
              <Route exact path="/login/:userEmail?"render={(props) => <Login {...props} /> }/>
              <Route exact path="/checkemail/:userEmail"render={(props) => <CheckEmail {...props} /> }/>
              <Route exact path="/emailverification/:userEmail/:token"render={(props) => <Emailverifiaction {...props} /> }/>                
              <Route exact path="/sendresetpassword"render={(props) => <SendResetPassword {...props} /> }/>                
              <Route exact path="/resetpassword/:userEmail/:token"render={(props) => <ResetPassword {...props} /> }/>                
              <Route exact path="/register">
                  <Register/>
              </Route> 
              <Route  path="/dashboard">
                  <ProtectedRoute  component={SideBar} path="/dashboard" user={user}/>
                  <ProtectedRoute  exact component={Home} path="/dashboard" user={user}/>
                  <ProtectedRoute  exact component={UsersList} path="/dashboard/userslist" user={user}/>
                  <ProtectedRoute  exact component={User} path="/dashboard/user" user={user}/>
                  <ProtectedRoute  exact component={Product} path="/dashboard/product" user={user}/>
                  <ProtectedRoute  exact component={ProductList} path="/dashboard/ProductList" user={user}/>
                  <ProtectedRoute  exact component={stock} path="/dashboard/stock" user={user}/>
                  <ProtectedRoute  exact component={IncomingPurchase} path="/dashboard/incomingpurchase" user={user}/>
                  <ProtectedRoute  exact component={IncomingPurchaseList} path="/dashboard/Incomingpurchaselist" user={user}/>
                  
              </Route>
              <Route path="*" component={ErrorPage}/>
            </Switch>  
      </Router>   
      </div>  
    </div>
    </Fragment>            
  );
}

export default App;
