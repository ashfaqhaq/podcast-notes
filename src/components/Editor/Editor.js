import React, { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase'
import Editor from "rich-markdown-editor";
import { selectUser } from '../../features/userSlice'
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.min.css";
function _Editor() {
    // const  episodeID  = queryString.parse(location.search)
 

    // const id = useSelector(selectSpotifyID)
    
    let { episodeID } = useParams()
    console.log("episodeID",episodeID)
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [unsaveChanges, setUnsaveChanges] = useState(false);
    const [noteID, setNoteID] = useState(null);
    const contentRef = useRef(null);
    const fileNameRef = useRef(null);
    const user = useSelector(selectUser)

    useEffect(() => {
        if (user && user.uid && episodeID) {
           
            const noteDocRef = db.collection("users").doc(user.uid).collection("notes").doc(episodeID);
            
            noteDocRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        noteDocRef.set({
                            name: "",
                            content: "",
                            createdAt: new Date(),
                            id: episodeID
                        })
                        setIsLoaded(true)
                    } else {
                        console.log('Document data:', doc.data());
                        setContent(doc.data().content)
                        setFileName(doc.data().name)
                        setIsLoaded(true)
                    }
                });
            setNoteID(noteDocRef)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])



    function saveToDb() {
        // const { user } = store.getState().user;
        // const noteDocRef = db.collection("users").doc(user.uid).collection("notes").doc(noteID);
        noteID.update({
            name: fileName,
            content,
            lastModified: new Date()
        });
        toast.success("🎉 Your changes have been saved!");
        setUnsaveChanges(false)
    }
    const onUnload = (event) => {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
        return "You have unsaved changes!";
    };
    useEffect(() => {
        if (unsaveChanges) {
            window.addEventListener("beforeunload", onUnload);
        } else {
            window.removeEventListener("beforeunload", onUnload);
        }

        return () => window.removeEventListener("beforeunload", onUnload);
    });

    return (
        <div> 
            <div className="player">
             <iframe 
            title="Spotify player"
            key="iframe"
      src={`https://open.spotify.com/embed/episode/${episodeID}`}
                 width="1000"
                 height="300"
             frameborder="0"
                allowtransparency="true"
                 allow="encrypted-media"
    />
    </div>
           
          
               File Title: 
            <br/>
            <div className="">
             <input placeholder="File Title...." className="px-10 m-2 border text-2xl focus:bg-green-100"ref={fileNameRef} value={fileName} onChange={(e) => { setFileName(e.target.value) }} /> 
              <button onClick={saveToDb} className="float-right bg-green-500 text-white font-semibold  hover:bg-green-700 m-3 p-2 rounded"  >
            Save Changes
            </button>
            </div>
          
            {
        isLoaded ?
                <div className="m-2 px-10 py-5 border min-h-full">
            <Editor
                defaultValue={content}
                ref={contentRef}
                onChange={(getValue) => {
                    setContent(getValue())
                    setUnsaveChanges(true)
                }

                }


            onShowToast={(message) => toast(message)}
            /> </div>: <h2>Loading....</h2>
    }

          

{/*            
            <button onClick={() => { console.log(unsaveChanges) }}>
            is it saved?
            </button>
            <button onClick={() => console.log(content)}>
            Get content
            </button> */}
<ToastContainer />
        </div >
    )
}

export default (_Editor)
