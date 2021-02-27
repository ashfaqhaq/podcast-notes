import React, { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase'
import store from '../../app/store';
import Editor from "rich-markdown-editor";
import axios from 'axios';
import {selectUser } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { writeID, removeID } from '../../features/spotifyIdSlice';
import _ from 'lodash';
import { selectSpotifyID } from '../../features/spotifyIdSlice';
function _Editor() {
    
    
    const getAccessToken = async () => {

        const res = await axios.get('http://localhost:8888/refresh_token');

        console.log(res.data.access_token)

    }

    // const id = useSelector(selectSpotifyID)
  
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const [unsaveChanges, setUnsaveChanges] = useState(false);
    const [noteID, setNoteID] = useState(null);
    const contentRef = useRef(null);
    const fileNameRef = useRef(null);
    const user = useSelector(selectUser)

    useEffect(() => {
            if(user && user.uid){
            console.log(user.uid)
          
           
                // var uriInput = prompt('Please Enter your id')
                let spotify = {
                    uniqueURI:  new Date().getUTCMilliseconds()
                };
                console.log(spotify.uniqueURI.toString())
              
                const noteDocRef =  db.collection("users").doc(user.uid).collection("notes").doc(spotify.uniqueURI.toString());
                //   console.log(await noteDocRef
                // const doc =  
                noteDocRef.get()
                .then(doc=> {
                    if (!doc.exists) {
                    noteDocRef.set({
                       name: "SpotifyAudioTitle",
                       content: "",
                       createdAt: new Date(),
                       id: spotify.uniqueURI
                   })
                   setIsLoaded(true)
               } else {
                   console.log('Document data:', doc.data());
                   setContent(doc.data().content)
                   setFileName(doc.data().name)
                   setIsLoaded(true)
               }});
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

            <button onClick={getAccessToken}> Get access token </button>
            <input ref={fileNameRef} value={fileName} onChange={(e) => { setFileName(e.target.value) }} />
            <button onClick={saveToDb}>
                Save
            </button>
            <h2> Give text input here : </h2>
            {isLoaded ?
            
            <Editor
                defaultValue={content}
                ref={contentRef}
                onChange={(getValue) => {
                    setContent(getValue())
                    setUnsaveChanges(true)
                  }
                   
                }

         
            // onShowToast={(message) => toast(message)}
            /> : <h2>Loading....</h2>}


            <button onClick={() => console.log(store.getState())}>
                Get store value
            </button>
            <button onClick={() => { console.log(unsaveChanges) }}>
                is it saved?
            </button>
            <button onClick={() => console.log(content)}>
                Get content
            </button>

        </div>
    )
}

export default React.memo(_Editor)
