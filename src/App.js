import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Footer from './components/Footer'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
export default function App() {
  // eslint-disable-next-line no-unused-vars
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        console.log(userAuth.uid)
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      } else {
        // use is logged out
        dispatch(logout());
      }
    })
  }, [dispatch]);



  return (
    <div>
      <Header />

     
     
           {/* <Signup/> */}
           {/* <Signin /> */}
           {/* <Home/> */}
           {/* <Userinfo /> */}
           {/* <Layout /> */}
           {/* <SearchBar/> */}
           {/* <Notes /> */}
             {/* <TakeNotes /> */}
             {/* <CreateNotes /> */}



     

      {/* <div className="app">
      <Header /> */}

      {!user ? (
        <div>
           <Login />

           <Signup/>



        </div>
      ) : (
        <div className="app_body">

         
          <h1>Logged in </h1>
         
          <button onClick={()=>dispatch(logout())}>Logout </button>
        </div>
      )}
      
    {/* </div> */}


    <Footer />
    </div>
  )
}
