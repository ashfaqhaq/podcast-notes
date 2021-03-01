import React, { useEffect,Fragment,Suspense } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { login, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Signup from './components/Signup'
import Modal from 'react-modal';
import Landing from './Pages/Landing'
import {  useHistory, withRouter } from 'react-router-dom';

import Dashboard from './Pages/Dashboard'



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
        console.log("user is logged in",userAuth.uid)
        closeModal()
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
       console.log("no person allowed")
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
      <div className="flex">
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
 
          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          <button className="flex flex-row-reverse" >X</button>
        <Signup />
        </Modal> </div>:null}
      <Suspense fallback={<center><img alt="loading" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiphy.com%2Fexplore%2Floading&psig=AOvVaw0mGA9yC4R1OrjNmnjqp5Hc&ust=1614650391321000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICm2cn_je8CFQAAAAAdAAAAABAN"/></center>}>
      {/* <Header /> */}

     

     
     
          
          
           {/* <Userinfo /> */}
           {/* <Layout /> */}
           {/* <SearchBar/> */}
           {/* <Notes /> */}
          {/* <TakeNotes /> */}
          {/* <CreateNotes /> */}

      {!user ? (
       
       <Landing /> 
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
      
  


    {/* <Footer /> */}
    </Suspense> 
    </div>
    
  )
}

export default withRouter(App)