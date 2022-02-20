import React,{useState,useEffect,Fragment} from 'react'
import './App.css';
import SideBar from './component/SideBar';
import Spinner from './component/Spinner';

import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Product from './pages/Product'
import ErrorPage from './pages/ErrorPage';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Regiter'
import IncomingPurchase from './pages/IncomingPurchases';


import {loadUser} from './utils/authenication'

import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute'
// import * as Sentry from "@sentry/react";

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
            //        const user = await loadUser()
            //        setUser(user)        
            //        console.log(user,"user inside app41581")
            async function fetchData() {
                  try {
                      const response = await loadUser()
                      setUser(response)
                      setLoading(false)
                      console.log(response,"user inside app41581")
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
              <Route exact path="/login"render={(props) => <Login {...props} /> }/>
              {/* <Login/> */}
              {/* <Route exact path="/login">     
                          <Login/>
              </Route> */}
              <Route exact path="/register">
                          <Register/>
              </Route> 
                 
                    {console.log(user,"user inside app")}
               
                    <Route  path="/dashboard">
                   
                        <ProtectedRoute  component={SideBar} path="/dashboard" user={user}/>
                        <ProtectedRoute  exact component={Home} path="/dashboard" user={user}/>
                        <ProtectedRoute  exact component={Users} path="/dashboard/userslist" user={user}/>
                        <ProtectedRoute  exact component={User} path="/dashboard/user" user={user}/>
                        <ProtectedRoute  exact component={IncomingPurchase} path="/dashboard/incomingpurchase" user={user}/>
                        <ProtectedRoute  exact component={Product} path="/dashboard/product" user={user}/>
                        <ProtectedRoute  exact component={ProductList} path="/dashboard/productlist" user={user}/>

{/* 
                        <Route exact path="/dashboard/userslist">
                                    <Users/>
                        </Route>   */}
                        {/* <Route exact path="dashboard/user">
                                    <User/>
                        </Route>   */}
                        {/* <Route exact path="/dashboard/incomingpurchase">
                                    <IncomingPurchase/>
                        </Route> 
                        <Route exact path="/dashboard/product">
                                    <Product/>
                        </Route>   
                        <Route exact path="/dashboard/productlist">
                                    <ProductList/>
                        </Route> */}
                        {/* <Redirect to="/login"/>  */}
                     </Route>
                  {/* } */}
                  {/* {!user &&<Redirect to="/login"/> } */}
            </Switch>  
      </Router>   
      </div>  
    </div>
    </Fragment>        
            
      //    <Route exact path="/product">
      //          <div className="container">
      //               <SideBar/>
      //               <Product/>
      //         </div>
      //   </Route>   
      //   <Route exact path="/productlist">
      //          <div className="container">
      //               <SideBar/>
      //               <ProductList/>
      //         </div>
      //   </Route>
      //   <Route path="*" component={ErrorPage}/>
    
  );
}

export default App;
