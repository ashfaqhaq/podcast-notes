import React, { useEffect,Fragment,Suspense } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Footer from './components/Footer'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import GoogleSignIn from './components/GoogleSignIn'
import Landing from './Pages/Landing'
import {  useHistory } from 'react-router-dom';
import Signout from './components/Signout';
const Routes = React.lazy(()=>import("./Routing/Routes"))
export default function App() {
  const history = useHistory()
  
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    var counter = 0;
    console.log("getting renderd",counter++)
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        console.log("user is logged in",userAuth.uid)
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
        // history.push("/dashboard")
      } else {
        console.log("user note found macha")
        dispatch(logout())
       history.push("/")
     
      }
    })
  }, [dispatch,history]);



  return (
    
   
    <div className="box-border font-montserrat">
      <Suspense fallback={<h1>Loading</h1>}>
      <Header />

      <Routes component={Routes} >
        
          <Landing/>
          <Signup/>
          <Login />
       



   </Routes>


     
     
          
          
           {/* <Userinfo /> */}
           {/* <Layout /> */}
           {/* <SearchBar/> */}
           {/* <Notes /> */}
          {/* <TakeNotes /> */}
          {/* <CreateNotes /> */}

      {!user ? (
        <div>
        <Landing />
        </div>
      ) : (
       <Fragment> 
          <h1>Logged in </h1>
          <div className="app_body">
      
        
         
        </div>
        </Fragment>
      )}
      
  


    <Footer />
    </Suspense> 
    </div>
    
  )
}
