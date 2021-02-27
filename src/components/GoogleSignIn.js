import React ,{useEffect } from 'react';
import { useHistory,withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../firebase';
import firebase from "firebase/app";


function GoogleSignIn() {
 
  const history = useHistory()
   const dispatch = useDispatch() 
   console.log("erere")
   useEffect(() => {
     console.log("erere")
    
 
  }, [dispatch,history])
  
  return (
    <div>
      <h1>  </h1>
    </div>
  )
}

export default (GoogleSignIn);
