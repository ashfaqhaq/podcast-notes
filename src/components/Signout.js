import React from 'react'
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
// import { history } from 'window-or-global';

// function signOut(){}

function Signout() {
   const history = useHistory()
    
    const dispatch = useDispatch()
    return(
        <div>
    {auth.signOut().then(() => {
        console.log("logged out")
        dispatch(logout())
        history.push('/');
        
     }).catch((error) => {
       // An error happened.
       console.log(error,"error")
     })
     // [END auth_sign_out]
   }
   </div>
    )}
export default Signout
