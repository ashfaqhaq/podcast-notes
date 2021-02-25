import React, { useEffect, useState,useRef } from 'react'
import { db } from '../../firebase'
import store from '../../app/store';
import Editor from "rich-markdown-editor";
function _Editor() {
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [noteID, setNoteID] = useState(null);
    // const contentRef = useRef(null);
    const fileNameRef = useRef(null);
        
    // const { uid } = user;
    useEffect(() => {
        const fetchData = async()=>{
        const { user } = store.getState().user;
            // const { uid } = user
        var uriInput = prompt('Please Enter your id')
        let spotify={
            uniqueURI: uriInput || new Date().getUTCMilliseconds()
        };
        console.log(spotify.uniqueURI.toString())
      const noteDocRef= await db.collection("users").doc(user.uid).collection("notes").doc(spotify.uniqueURI.toString());
    //   console.log(await noteDocRef
      const doc = await noteDocRef.get()
      if (!doc.exists) {
       await noteDocRef.set({
            name:"SpotifyAudioTitle",
            content:"",
            createdAt:new Date(),
            id:spotify.uniqueURI     
        })
      } else {
        console.log('Document data:', doc.data());
        setContent(doc.data().content)
        setFileName(doc.data().name)
        
      }
      setNoteID(noteDocRef)
      
      
        }
        fetchData()
    }, [])

    const saveToDb = () => {
        noteID.update({
            name:fileName,
            content,
            lastModified: new Date()
        })
        

        
    }

    return (
        <div>
            <input ref={fileNameRef} value={fileName} onChange={(e)=>{setFileName(e.target.value)}} />

            

            <button onClick={saveToDb}>
                Save
            </button>



            <h2> Give text input here : </h2>
            <Editor
                
                defaultValue={content}
                
                onChange={(getValue) => {
                    setContent(getValue());
                }}
               
            // uploadImage={uploadImage}
            // onShowToast={(message) => toast(message)}
            />


            <button onClick={() => console.log(store.getState())}>
                Get store value
            </button>
            <button onClick={() => console.log(content) }>
                Get content
            </button>

        </div>
    )
}

export default _Editor
