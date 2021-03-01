import React from 'react'
import { auth } from '../firebase';
import { withRouter,useHistory } from 'react-router-dom';
// import App from '../App'
// import { history } from 'window-or-global';

// function signOut(){}

function Signout() {
      const history = useHistory()
    return(
        <div>
          
    {auth.signOut()
   
     .then(()=> { history.push("/")})
     .catch((error) => {
       // An error happened.
      
     })
     // [END auth_sign_out]
   }
   </div>
    )}
export default withRouter(Signout)
