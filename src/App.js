import React, { useEffect,Fragment,Suspense } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { login, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Signup from './components/Signup'
import Modal from 'react-modal';
import Landing from './Pages/Landing'
import {  useHistory, withRouter } from 'react-router-dom';
import loading from './images/loading.gif'
import Dashboard from './Pages/Dashboard'
import Footer from './components/Footer'


const Routes = React.lazy(()=>import("./Routing/Routes"))
 function App() {
  const history = useHistory()
  
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  const [modalIsOpen,setIsOpen] = React.useState(false);
    
    function openModal() {
        setIsOpen(true);
      }
     
      // function afterOpenModal() {
      //   // references are now sync'd and can be accessed.
      //   subtitle.style.color = '#f00';
      // }
      
      function closeModal(){
        setIsOpen(false);
      }
  useEffect(() => {
 
   
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
    
        closeModal()
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))

     
        // <Redirect to = {history.location.pathname} />
        history.push(history.location.pathname)
        // history.push("/dashboard")
      } else {
      
     if (history.location.pathname.length>3){
      openModal()
     }
      //  

        // console.log("user note found macha")
        // dispatch(logout())
        // history.push('/')

     
      }
    })
  
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,history]);



  return (
    
   
    <div className="box-border font-montserrat">
      { modalIsOpen?  
      <div className="h-12 sm:h-6">
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
 
          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          <button className="" >X</button>
        <Signup />
        </Modal> </div>:null}
      <Suspense fallback={<center><img alt="loading" 
      src={loading}      />
      </center>}>
      {/* <Header /> */}

     

     
     
          
          
           {/* <Userinfo /> */}
           {/* <Layout /> */}
           {/* <SearchBar/> */}
           {/* <Notes /> */}
          {/* <TakeNotes /> */}
          {/* <CreateNotes /> */}

      {!user ? (
       <Fragment>
       <Landing /> 
       <Footer />
       </Fragment>
        ) : ( <Fragment> 
          
          <div>
          
          {/* {<Redirect to="/dashboard" component={Dashboard} />} */}
          <Routes component={Routes} >
        
         
         <Dashboard />
        
        {/* <SideDrawer />
         <ClippedDrawer />
         <Editor/> */}
         {/* <Search/> */}
          {/* <Notes/> */}

        

   </Routes>

         
        </div>
        </Fragment>
      )}
      
  


   
    </Suspense> 
    </div>
    
  )
}

export default withRouter(App)