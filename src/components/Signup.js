import React, { useState } from 'react';
import {withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth,db} from '../firebase';
// eslint-disable-next-line no-unused-vars
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
        var userDocRef = db.collection("users").doc(userAuth.user.uid);
        userDocRef.set({
          'info': {
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoURL: userAuth.user.photoURL,
          }
        })
       
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
        <div class="container grid md:grid-cols-2 grid-cols-1 justify-center ">
         
        {signup?
        <div>
    <Register/>
   
    </div> :  <Login />   

    }
           <center>
           <div className="container p-8 middle bg-black rounded-lg max-w-md">
                      Authenticate with 
          <div className="md:h-12 h-6 mt-3 rounded w-full  px-3 ">
           <GoogleButton onClick={()=>GoogleSignIn()}/>
           </div>
           
           {/* <div className="h-12 mt-3 rounded w-full  px-3">
              <GithubButton />
              </div> */}
              </div>
              <div class="p-0 text-gray-400 mb-1">
             {signup? 
             <div> Already a member? <div onClick={(e)=>{e.preventDefault();setSignup(false)}}>
               <button className="bg-blue-500 hover:bg-blue-700 my-2 px-4 py-2 font-semibold text-white rounded">
               Login</button></div>
             </div> 
             :
             <div class="p-0 text-gray-400 font-2xl mb-6"> 
             New user?
              <div onClick={(e)=>{e.preventDefault();setSignup(true)}}><button className="bg-green-500   px-4 py-2 font-semibold hover:bg-green-700 m-2 p-2 text-white rounded">Signup</button></div></div>
             }
             </div>
              </center>
        </div>
    
   
    </div>
   
    </form>
  
    </div>)
}

export default withRouter(Signup)
