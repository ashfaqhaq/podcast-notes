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
import {  useHistory, withRouter,Redirect } from 'react-router-dom';
import Signout from './components/Signout';
import Dashboard from './Pages/Dashboard'
const Routes = React.lazy(()=>import("./Routing/Routes"))
 function App() {
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
        console.log(history.location.pathname)
        // <Redirect to = {history.location.pathname} />
        history.push(history.location.pathname)
        // history.push("/dashboard")
      } else {
        console.log("user note found macha")
        dispatch(logout())
        
         history.push("/");
     
      }
    })
  
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,history]);



  return (
    
   
    <div className="box-border font-montserrat">
      <Suspense fallback={<h1>Loading</h1>}>
      <Header />
{/* 
      <Routes component={Routes} >
        
          <Landing/>
          <Signup/>
          <Login />
         <Dashboard />



   </Routes> */}


     
     
          
          
           {/* <Userinfo /> */}
           {/* <Layout /> */}
           {/* <SearchBar/> */}
           {/* <Notes /> */}
          {/* <TakeNotes /> */}
          {/* <CreateNotes /> */}

      {!user ? (
       
       <Landing />
        ) : (
       <Fragment> 
          <h1>Logged in </h1>
          <div className="app_body">
          {/* {<Redirect to="/dashboard" component={Dashboard} />} */}
          <Dashboard />
         
        </div>
        </Fragment>
      )}
      
  


    <Footer />
    </Suspense> 
    </div>
    
  )
}

export default withRouter(App)