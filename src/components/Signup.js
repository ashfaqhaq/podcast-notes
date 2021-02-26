import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth, db } from '../firebase';


function Signup() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();
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
      }).catch(error => alert(error));
  };
  return (
    <div>
      <form>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full name (required if registering)"
        />
        <input
          type="text"
          value={profilePic}
          onChange={e => setProfilePic(e.target.value)}
          placeholder="Profile picture URL (optional)"
        />
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
        <button type="submit" onClick={register}>Register</button>
      </form>
      <div class=" bg-gray-300">
        <div class="container flex justify-center py-20">
          <div class="p-8 bg-white rounded-lg max-w-md pb-10">
            <div class="flex justify-center mb-4">
               <img src="https://i.imgur.com/f6Tb5U1.png" width="70" alt="random img" /> 
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
            
            class="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            
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
                <div class="w-full" > <span class="p-2 text-gray-400 mb-1">OR</span>
                </div>
                  <div class="w-full" >
          
            
          
          
            <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
              <i class="fa fa-google mr-2">
                </i>Google
              </button>
              </div>
              </div>


           
           
           </div>


        </div>
    
   
    </div>
   
    
  
    </div>)
}

export default Signup
