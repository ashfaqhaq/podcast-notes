import React from 'react'
import { Switch,Redirect } from 'react-router-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import GoogleSignIn from '../components/GoogleSignIn';
import Signout from '../components/Signout';
import Signup from '../components/Signup';
import Dashboard from '../Pages/Dashboard';
import Landing from '../Pages/Landing';
import App from '../App.js'
function Routes() {
    return (
        <div>
            <Router>
                  <Switch>
                  {/* <Route exact path="/" component={App}> */}
                  <Route exact path="/" component={App} >
                      
                      
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/signup" component= {Signup}/>
                  {/* <Route exact path="/signout" component= {Signout}/> */}
                    
                 
                  </Route>
                  {/* <Redirect path="/home" component={Landing}/> */}
            {/* <Route exact path="/Gsignin" component= {GoogleSignIn} /> */}
                  
                  </Switch>
            </Router>
        </div>
    )
}

export default Routes
