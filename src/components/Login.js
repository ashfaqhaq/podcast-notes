import React, { useState } from 'react';
import { Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../firebase';


function Login() {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    // const [profilePic, setProfilePic] = useState('');
    
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
        .then(()=>{return (<Redirect to="/dashboard" />)})
      
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

export default Login
