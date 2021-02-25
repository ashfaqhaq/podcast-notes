import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth,db } from '../firebase';


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
            .then(async ()=>{
                
                var userDocRef = db.collection("users").doc(userAuth.user.uid);
                userDocRef.set({
                        'info':{
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: name,
                        photoURL: profilePic,
                    }});
             
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
        </div>
    )
}

export default Signup
