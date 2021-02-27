import React from 'react'
import { Switch } from 'react-router-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import GoogleSignIn from '../components/GoogleSignIn';
import Signup from '../components/Signup';
import Dashboard from '../Pages/Dashboard';
import Landing from '../Pages/Landing';
function Routes() {
    return (
        <div>
            <Router>
                  <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route  exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/signup" component= {Signup}/>
            {/* <Route exact path="/Gsignin" component= {GoogleSignIn} /> */}
                  
                  </Switch>
            </Router>
        </div>
    )
}

export default Routes
