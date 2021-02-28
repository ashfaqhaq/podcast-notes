import React from 'react'
import { Switch,Redirect } from 'react-router-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import GoogleSignIn from '../components/GoogleSignIn';
import Signout from '../components/Signout';
import Signup from '../components/Signup';
import Notes from '../components/Notes';
import Editor from '../components/Editor/Editor';
import Search from '../components/Search';
import EpisodeList from '../components/EpisodeList';
import { selectUser } from '../features/userSlice';
import Dashboard from '../Pages/Dashboard';
import Landing from '../Pages/Landing';
import App from '../App.js'
import { useSelector } from 'react-redux';
import { console } from 'window-or-global';
function Routes() {
    const user = useSelector(selectUser)
    console.log(user)
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
                  {/* <Route exact path="/signout" component= {Signout}/> */}
                    
                 
                  
                  {/* <Redirect path="/home" component={Landing}/> */}
            {/* <Route exact path="/Gsignin" component= {GoogleSignIn} /> */}
            
            <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/search">
            <Dashboard />
            {/* <Search /> */}
          </Route>
          <Route path="/editor/:episodeID" >
          <Dashboard />
          </Route>
          <Route path="/episodes">
          <Dashboard />
          </Route>
                  </Switch>
            </Router>
        </div>
    )
}

export default Routes
