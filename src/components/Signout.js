import React from 'react'
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useHistory,withRouter,Redirect } from 'react-router-dom';
import App from '../App'
import Landing from '../Pages/Landing';
// import App from '../App'
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
        
        
     })
     .then(()=> { <Redirect to="/"/>})
     .catch((error) => {
       // An error happened.
       console.log(error,"error")
     })
     // [END auth_sign_out]
   }
   </div>
    )}
export default withRouter(Signout)
