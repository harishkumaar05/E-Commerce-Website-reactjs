import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import {useEffect} from "react";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import {auth} from "./firebase";
import Orders from './Orders';
import {useStateValue} from "./StateProvider";
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
function App() {
const promise = loadStripe('pk_test_51Iw0DVSCQXel1DkI40SRwoAECcGgtV3FYllbotdMo3H57p6aeai8jNgkROm0gQPIgvOf5xnwGQOu09aKh020AvuQ0094QQpS2X');
const [{},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ' ,authUser);
      if(authUser){
        //user logged in
        dispatch ({
          type:'SET_USER',
          user:authUser
        })
      }else{
        //user logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="App">
   
      <Switch>
      <Route path="/orders">
      <Header/>
       <Orders/>
      </Route>
      <Route path="/login">
       <Login/>
      </Route>
      <Route path="/checkout">
        <Header/>
        <Checkout/> 
      </Route>
      <Route path="/payment">
        <Header/>
        <Elements stripe={promise}>
           <Payment/>
        </Elements>
        
      </Route>
      <Route path="/">
      <Header/>
      <Home />
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
