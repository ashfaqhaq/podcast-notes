import React, { useState } from 'react';
import { Redirect,Route,Switch,useHistory, useLocation,withRouter} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../firebase';


function Login() {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const  history=useHistory()
    const location = useLocation()
    const dispatch = useDispatch();

    const loginToApp = e => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          }))
        })
        // .then(()=>{return (<Switch>
        // <Route to="/dashboard" >
        //   <Dashboard />
        // </Route>
        // <Route to="/dashboard" >
        //   <Dashboard />
        // </Route>
        // <Route to="/dashboard" >
        //   <Dashboard />
        // </Route>
        // </Switch> )})
       .then(()=>console.log(location)) 
      
        .catch(error => alert(error));
    };
  
    return (
        <div>
            <form>
        
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>Sign In</button>
      </form>
        </div>
    )
}



export default withRouter(Login)
