import React, { useState } from 'react';
import { withRouter} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../firebase';
import Logo from '../images/logo_size.jpg'

function Login() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
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
      
        .catch(error => alert(error));
    };
  
    return (
        <div>
            <form>
            <div class="p-8 bg-black rounded-lg max-w-md pb-10">
        <div class="flex justify-center mb-4">
           <img src={Logo} alt="random img" /> 
        </div> 
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          class="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
        />
        <button type="submit" 
         class="uppercase h-12 mt-3 text-white w-full rounded bg-blue-500 hover:bg-blue-600"
        onClick={loginToApp}>Sign In</button>
    </div>
      </form>
        
        </div>
    )
}



export default withRouter(Login)
