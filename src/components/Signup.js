import React, { useState } from 'react';
import {Redirect,useHistory,withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth, db } from '../firebase';
import GithubButton from 'react-github-login-button'
import GoogleButton from 'react-google-button';
import firebase from 'firebase/app'
import Login from './Login'
import { Divider } from '@material-ui/core';
import Register from './Register';
function Signup({newUser}) {
  // const history = useHistory()
console.log(newUser)
  const [signup, setSignup] = useState(newUser)
  const dispatch = useDispatch();
  const GoogleSignIn=()=>
  {var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((userAuth) => {
  
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          profileUrl: userAuth.user.photoURL,
        }))
        // history.push('/')
      }).catch((error) => {
        console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        //  var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //  var credential = error.credential;
        // ...
        console.log("error", errorCode)
        console.log("errorMessage", errorMessage)
        // console.log("email",email)
        // console.log("error",error)
      });}
  
  return (
    <div>
      <form>
    
      
      <div class="bg-hero">
        <div class="container flex justify-center">
         
        {signup?
        <div>
    <Register/>
   
    </div> :  <Login />   

    }
           <center>
           <div className="container p-8 middle bg-black rounded-lg max-w-md">
                      Authenticate with 
          <div className="h-12 mt-3 rounded w-full  px-3 ">
           <GoogleButton onClick={()=>GoogleSignIn()}/>
           </div>
           <Divider />
           <div className="h-12 mt-3 rounded w-full  px-3">
              <GithubButton />
              </div>
              </div>
              <div class="p-0 text-gray-400 mb-1">
             {signup? 
             <div> Already a member? <div onClick={()=>setSignup(false)}>Login</div>
             </div> 
             :
             <div class="p-0 text-gray-400 font-2xl mb-1"> 
             New user?
              <div onClick={()=>setSignup(true)}>Signup</div></div>
             }
             </div>
              </center>
        </div>
    
   
    </div>
   
    </form>
  
    </div>)
}

export default withRouter(Signup)
