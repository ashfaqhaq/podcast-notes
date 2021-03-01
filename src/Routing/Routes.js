import React from 'react'
import { Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Signup from '../components/Signup';
import PageNotFound from '../Pages/PageNotFound'
import { selectUser } from '../features/userSlice';
import Dashboard from '../Pages/Dashboard';
import Landing from '../Pages/Landing';

import { useSelector } from 'react-redux';

function Routes() {
    const user = useSelector(selectUser)
    
    return (
        <div>
            <Router>
                  <Switch>
                  <Route exact path="/">
                  {/* <Route exact path="/" component={App} > */}
                    {  user?
                      <Dashboard />: <Landing/>
                      }
                
                 </Route>  
                  {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                  <Route exact path="/signup" component= {Signup}/>
                  {/* <Route  path="/signup" component= {Signup}/> */}
                  {/* <Route exact path="/signout" component= {Signout}/> */}
                    
                 
                  
                  {/* <Redirect path="/home" component={Landing}/> */}
            {/* <Route exact path="/Gsignin" component= {GoogleSignIn} /> */}
            
           
          <Route path="/search">
            <Dashboard />
           
          </Route>
          <Route path="/notes">
            <Dashboard />
           
          </Route>
          <Route path="/editor/:episodeID" >
          <Dashboard />
          </Route>
          <Route path="/episodes">
          <Dashboard />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
                  </Switch>
            </Router>
        </div>
    )
}

export default Routes
