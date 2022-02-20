import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ component: Component, user, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("token");

console.log(user, "user from protected route")
  return (
    <Route
      {...restOfProps}
      render={(props) =>{
        console.log(props,"prps protected route")
        return user ? <Component {...props} user={user} /> : <Redirect to={{pathname:"/login",state: {from:props.location}}} />}
      }
    />
  );
}
