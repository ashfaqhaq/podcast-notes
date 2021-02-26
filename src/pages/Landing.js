import React , {useState} from 'react'
// import svg from '../images/undraw_walk_in_the_city_1ma6 (1).svg'
import ReactDOM from 'react-dom';
import Signup from '../components/Signup'
import Modal from 'react-modal';
import svg from '../images/podcast_audience.jpg'
function Landing() {
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
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    
    function openModal() {
        setIsOpen(true);
      }
     
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
     
      function closeModal(){
        setIsOpen(false);
      }
    return (
        <div>
            <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
        <Signup />
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 flex items-center gap-4">
            <div className="mx-6">
               
                <h1 className="mt-15 mb-5 text-green-700">
                    Don't Just Listen to Podcast.  
                    </h1>
                   
                    <p className="">
                        In this on fast pace world, we feel ourselves filled with massive amount of information.
                    </p>
                    <button  onClick={openModal} className="mt-3 bg-green-900 text-white hover:text-green-900 hover:bg-white  font-bold py-2 px-4 rounded">Join for free</button>
                    <button className="mt-3 mx-3 bg-yellow-500 text-black hover:text-green-900 hover:bg-white  font-bold py-2 px-4 rounded">Login</button>
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


           

        </div>
    )
}

export default Landing
