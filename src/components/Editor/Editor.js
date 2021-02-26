import React, { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase'
import store from '../../app/store';
import Editor from "rich-markdown-editor";
import axios from 'axios';
function _Editor() {
    const getAccessToken = async () => {
        var client_id = 'd8e82e896d3a4adb8e04b3375d9b1f8b'; // Your client id
        var client_secret = '03e293e2e8fb499ba85812272ab09a86'; // Your secret
        var authOptions = {
            // url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: "client_credentials"
                // refresh_token: refresh_token
            },
            json: true
        };

        //   if (!error && response.statusCode === 200) {
        //     var access_token = body.access_token;
        //     res.send({
        //       'access_token': access_token
        //     });
        //   }
        // console.log()

        const res = await axios.get('http://localhost:8888/refresh_token');
        // .then(resp => console.log(resp.data))
        // .then(err => console.error(err));
        console.log(res.data.access_token)
        // res.data.headers['Content-Type'] ="application/json";
    }


    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [unsaveChanges, setUnsaveChanges] = useState(false);
    const [noteID, setNoteID] = useState(null);
    const contentRef = useRef(null);
    const fileNameRef = useRef(null);

    // const { uid } = user;
    useEffect(() => {
        const fetchData = async () => {
            const { user } = store.getState().user;
            // const { uid } = user
            var uriInput = prompt('Please Enter your id')
            let spotify = {
                uniqueURI: uriInput || new Date().getUTCMilliseconds()
            };
            console.log(spotify.uniqueURI.toString())
            const noteDocRef = await db.collection("users").doc(user.uid).collection("notes").doc(spotify.uniqueURI.toString());
            //   console.log(await noteDocRef
            const doc = await noteDocRef.get()
            if (!doc.exists) {
                await noteDocRef.set({
                    name: "SpotifyAudioTitle",
                    content: "",
                    createdAt: new Date(),
                    id: spotify.uniqueURI
                })
            } else {
                console.log('Document data:', doc.data());
                setContent(doc.data().content)
                setFileName(doc.data().name)
                setIsLoaded(true)
            }
            setNoteID(noteDocRef)


        }
        fetchData()
    }, [])

    const saveToDb = () => {
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
            {isLoaded ? <Editor

                defaultValue={content}
                ref={contentRef}
                onChange={(getValue) => {
                     setContent(getValue())
                     setUnsaveChanges(true)
                    }
                    //  ()=>{console.log("value is changed")}
                }

            // uploadImage={uploadImage}
            // onShowToast={(message) => toast(message)}
            /> : <h2>Loading....</h2>}


            <button onClick={() => console.log(store.getState())}>
                Get store value
            </button>
            <button onClick={()=>{console.log(unsaveChanges)}}>
                is it saved?
            </button>
            <button onClick={() => console.log(content)}>
                Get content
            </button>

        </div>
    )
}

export default _Editor
