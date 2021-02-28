import React, { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase'
import store from '../../app/store';
import Editor from "rich-markdown-editor";
import axios from 'axios';
import { selectUser } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { writeID, removeID } from '../../features/spotifyIdSlice';
import _ from 'lodash';
import { selectSpotifyID } from '../../features/spotifyIdSlice';
import queryString from 'query-string'
import { useLocation, useParams } from 'react-router-dom'
import FlipMove from 'react-flip-move'
function _Editor() {
    const location = useLocation()
    // const  episodeID  = queryString.parse(location.search)
 

    // const id = useSelector(selectSpotifyID)
    
    let { episodeID } = useParams()
    console.log("episodeID",episodeID)
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [h, setH] = useState(300)
    const [w, setW] = useState(1000)
    const [unsaveChanges, setUnsaveChanges] = useState(false);
    const [noteID, setNoteID] = useState(null);
    const contentRef = useRef(null);
    const fileNameRef = useRef(null);
    const user = useSelector(selectUser)

    useEffect(() => {
        if (user && user.uid && episodeID) {
            console.log("useEffect render",user.uid)


            // var uriInput = prompt('Please Enter your id')
            // let spotify = {
            //     uniqueURI: new Date().getUTCMilliseconds()
            // };
            // console.log(spotify.uniqueURI.toString())

            const noteDocRef = db.collection("users").doc(user.uid).collection("notes").doc(episodeID);
            //   console.log(await noteDocRef
            // const doc =  
            noteDocRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        noteDocRef.set({
                            name: "Placeholder text",
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
    }, [user])



    function saveToDb() {
        // const { user } = store.getState().user;
        // const noteDocRef = db.collection("users").doc(user.uid).collection("notes").doc(noteID);
        console.log(content)
        noteID.update({
            name: fileName,
            content,
            lastModified: new Date()
        });
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
                 width={w}
                 height={h}
             frameborder="16"
                allowtransparency="true"
                 allow="encrypted-media"
    />
    </div>
           
          
               Notes Name <br/>
                <input ref={fileNameRef} value={fileName} onChange={(e) => { setFileName(e.target.value) }} />
          <br/>
           <button onClick={saveToDb} className="bg-green-500 text-white transition hover:scale-110 mx-3 p-3 rounded"  >
            Save
            </button>
            <input className="border bg-red" onChange={(e)=>setH(e.target.value)} />
            <input  className="border bg-red" onChange={(e)=>setW(e.target.value)} />
            {
        isLoaded ?
                <div className="m-10 px-10 py-5 border min-h-full">
            <Editor
                defaultValue={content}
                ref={contentRef}
                onChange={(getValue) => {
                    setContent(getValue())
                    setUnsaveChanges(true)
                }

                }


            // onShowToast={(message) => toast(message)}
            /> </div>: <h2>Loading....</h2>
    }


{/*            
            <button onClick={() => { console.log(unsaveChanges) }}>
            is it saved?
            </button>
            <button onClick={() => console.log(content)}>
            Get content
            </button> */}

        </div >
    )
}

export default (_Editor)
