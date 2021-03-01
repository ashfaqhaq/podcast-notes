import React from 'react'
// import svg from '../images/undraw_walk_in_the_city_1ma6 (1).svg'
// import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring'
import Signup from '../components/Signup'
import Modal from 'react-modal';
import svg from '../images/podcast_audience.jpg'
import logo from '../images/logo_size.jpg'
function Landing() {
    
    const props = useSpring({opacity: 1, from: {opacity: 0}})
    const [newUser,setNewUser] = React.useState(true)
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
    
    function handleSignUp() {
        setNewUser(true)
        setIsOpen(true);
      }
      function handleLogin() {
         setNewUser(false) 
        setIsOpen(true);
      }
     
      
      function closeModal(){
        setIsOpen(false);
      }
    return (
        <animated.div style={props}>
            <div className="mt-4"> 
                <img src={logo} alt="logo"/>
                <span className="mx-5 font-semibold">Your notebook for podcasts</span>
              </div>
            
            <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
         
          <button className="bg-red-400 p-2 px-4 m-2 float-right rounded  text-white hover:bg-red-700 flex flex-row-reverse" onClick={closeModal}> Close X</button>
        <Signup newUser={newUser}/>
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 flex items-center gap-4">
            <div className="mx-6">
               
                <h1 className="mt-15 mb-5 text-green-700">
                    Don't Just Listen to a Podcast.  
                    </h1>
                   
                    <p className="">
                        Retaining information has become more difficult than before. Due to which long format content such as Podcast barely get any attention, in spite of the fact that podcasts provide a plethora of knowledge to it's audience.
                        <br/>
                        <strong>PodcastKeep provides an interactive interface to write down your notes while listening to your favourite podcast. </strong>
                    </p>
                    <button  onClick={handleSignUp} className="mt-3 bg-green-500 text-white  hover:bg-green-900  font-bold py-2 px-4 rounded">Join for free</button>
                    <button  onClick={handleLogin} className="mt-3 mx-3 bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4 rounded  hover:transform scale-90">Login</button>
                </div>    
                <div className="">
                    <center>
              <img src= {svg} width="500px" height="500px" alt="person walking"/>
              </center> </div>    

              </div>
              <div className="flex flex-nowrap sm:flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ">
  
  <div className="p-2 sm:p-10 text-center cursor-pointer  text-green-500">
      <div className="py-16 max-w-sm rounded overflow-hidden shadow-lg hover:bg-white transition duration-500  bg-white">
          <div className="space-y-10">
              <i className="fa fa-book"  style={{fontSize:'48px'}}></i>
              
              <div className="px-6 py-4">
                  <div className="space-y-5">
                      <div className="font-bold text-xl mb-2">Take Notes</div>
                      <p className="text-gray-700 text-base">
                          Listen to your favorite podcast(s) and take notes
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="p-2 sm:p-10 text-center cursor-pointer text-white"> 
      <div className="py-16 max-w-sm rounded overflow-hidden shadow-lg bg-green-500 hover:bg-white hover:text-green-500  transition duration-500">
          <div className="space-y-10">
            <i className="fa fa-cloud-upload"  style={{fontSize:'48px'}}></i>
              <div className="px-6 py-4">
                  <div className="space-y-5 hover:text-black-500">
                      <div className="font-bold text-xl mb-2">Cloud Storage</div>
                      <p className="text-base">
                            Access your data from anywhere, anytime.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="p-2 sm:p-10 text-center cursor-pointer translate-x-2">
      <div className="py-16 max-w-sm rounded overflow-hidden shadow-lg hover:bg-white transition duration-500 bg-white ">
          <div className="space-y-10">
              <i className="fa fa-indent" style={{fontSize:'48px'}}></i>
             
              <div className="px-6 py-4">
                  <div className="space-y-5">
                      <div className="font-bold text-xl mb-2">Rich Text and Markdown Support</div>
                      <p className="text-gray-700 text-base">
                         Editing and formatting is simple as the editor follows markdown rules
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>

</div>

              </div>


           

              </animated.div>
    )
}

export default Landing
