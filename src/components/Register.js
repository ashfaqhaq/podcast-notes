import React, { useState } from 'react';
import {useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth, db } from '../firebase';
import Logo from '../images/logo_size.jpg'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()

    const register = (e) => {
    
        e.preventDefault();
        if (!name) {
          return alert("Please enter a full name");
        };
    
        auth.createUserWithEmailAndPassword(email, password)
          .then(userAuth => {
            userAuth.user.updateProfile({
              displayName: name,
              photoURL: profilePic,
            })
              .then(async () => {
    
                var userDocRef = db.collection("users").doc(userAuth.user.uid);
                userDocRef.set({
                  'info': {
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic,
                  }
                });
    
              })
              .then(() => {
                dispatch(login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: name,
                  photoURL: profilePic,
                }))
              })
              .then(()=>{return (history.push("/dashboard"))})
          }).catch(error => alert(error));
      };
    return (
        <div class="p-8 bg-black rounded-lg max-w-md pb-10">
        <div class="flex justify-center mb-4">
           <img src={Logo} alt="random img" /> 
        </div> 
        
        <input
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
        
        class="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
        
        placeholder="Name" /> 
         <input
      type="text"
      value={profilePic}
      onChange={e => setProfilePic(e.target.value)}
      placeholder="Profile picture URL (optional)"
        
        class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
        
       />
        <input
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Email"
        
        class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100" /> 
        <input
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
         class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100" placeholder="Password"/> 
        {/* <input type="Password" class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100" placeholder=" Retype password" />  */}
        <button 
        onClick={register}
        class="uppercase h-12 mt-3 text-white w-full rounded bg-green-600 hover:bg-green-900">Register</button>


       
          <div class="flex justify-between items-center mt-3">
            {/* <div class="w-full" > <span class="p-2 text-gray-400 mb-1">OR</span> */}
            <div class="w-full" > 
            

            </div>
              {/* <div class="w-full" >
      
        
      
             
          
       
          </div> */}
          </div>
         

       
       
       </div>
      
      
      
       
    )
}

export default Register
