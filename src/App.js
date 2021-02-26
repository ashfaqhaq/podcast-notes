import React, { useEffect,Fragment,Suspense } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Footer from './components/Footer'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
// import Routes from './Routing/Routes'
import Dashboard from './pages/Dashboard';

const Routes = React.lazy(()=>import("./Routing/Routes"))
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
    <Suspense fallback={
    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsezeromer.com%2Fen%2Fxamarin-forms-gif-loading-ikonu%2F&psig=AOvVaw0v7CKEG5x_xbrNZ7LKrytZ&ust=1614402236323000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKD5hZTjhu8CFQAAAAAdAAAAABAD" />}>
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
       
       <Fragment>
        <Routes component={Routes} />
         {/* <Dashboard />
           {/* <Editor /> */}
         {/* </Dashboard>  */}

       {/* </Routes> */}
      

         
          <h1>Logged in </h1>
          <div className="app_body">
          <button onClick={()=>dispatch(logout())}>Logout </button>
        </div>
        </Fragment>
      )}
      
    {/* </div> */}


    <Footer />
    </div>
    </Suspense>
  )
}
