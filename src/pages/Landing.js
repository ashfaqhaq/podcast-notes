import React from 'react'
// import svg from '../images/undraw_walk_in_the_city_1ma6 (1).svg'
// import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring'
import Signup from '../components/Signup'
import Modal from 'react-modal';
import svg from '../images/podcast_audience.jpg'
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
            <div> 
              </div>
            
            <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
         
          <button className="flex flex-row-reverse" onClick={closeModal}>X</button>
        <Signup newUser={newUser}/>
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 flex items-center gap-4">
            <div className="mx-6">
               
                <h1 className="mt-15 mb-5 text-green-700">
                    Don't Just Listen to a Podcast.  
                    </h1>
                   
                    <p className="">
                        In this on fast pace world, we feel ourselves filled with massive amount of information.
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
                      <div className="font-bold text-xl mb-2">Auto Save</div>
                      <p className="text-base">
                            All the notes are saved on the cloud
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div className="p-2 sm:p-10 text-center cursor-pointer translate-x-2">
      <div className="py-16 max-w-sm rounded overflow-hidden shadow-lg hover:bg-white transition duration-500 bg-white ">
          <div className="space-y-10">
              <i className="fa fa-users" style={{fontSize:'48px'}}></i>
             
              <div className="px-6 py-4">
                  <div className="space-y-5">
                      <div className="font-bold text-xl mb-2">Community and Rich text</div>
                      <p className="text-gray-700 text-base">
                         Be a part of the growing Community
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
