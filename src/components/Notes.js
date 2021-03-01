import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.min.css";
import { selectUser } from '../features/userSlice';
import {db } from '../firebase';
function Notes() {
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const [notes, setNotes] = useState()
    const user = useSelector(selectUser)
    const getDate =(sec,nano)=>{
        const fireBaseTime = new Date(
            sec * 1000 +nano / 1000000,
          )
         
    return [fireBaseTime.toDateString(),fireBaseTime.toLocaleTimeString()]
    }

    const deleteNote = async(id)=>{
        const isOkDelete  = window.confirm('Are you sure you want to remove this item?');

       
        if (isOkDelete) {
            db.collection('users').doc(user.uid).collection('notes').doc(id).delete()
            .then(async()=>{
                let listWithUndeleted = await notes.filter(item=>item.id!==id)
                setNotes(listWithUndeleted)
            })   
            toast.success("🎉 Item has been successfully deleted");
         } else {
            // do not delete this item...
         }
       
    }
    useEffect(() => {
            async function getNotes(){
                const snapshot = await db.collection('users').doc(user.uid).collection('notes').get()
                const collection = [];
              
                snapshot.forEach(doc => {
                    collection.push(doc.data());
                });
            setNotes(collection)
            setIsLoaded(true)
                 
            }
            getNotes()
    }, [user.uid])
    return (
        <div>
            
        {isLoaded?
(<div className="">
 <div class="grid grid-flow-row md:grid-cols-3 grid-cols-1  gap-4">
 {notes?.map(data=>
    // <div class="w-full mb-2 md:w-1/2 md:mx-4 border rounded shadow-sm">
    <div class="border rounded shadow-sm">
       
            {/* <img class="rounded" alt="logo" width="360px" height="px" src={data.images[0]?.url} /> */}
      
        <div class="px-4 py-4">
            <div>
                <span  class="font-semibold leading-tight text-1xl text-gray-800 hover:text-gray-800">
                {data.name} <div onClick={()=>deleteNote(data.id)} className="float-right"><i className="fa fa-trash"></i></div> 
                </span>
            </div>
            <hr class="border-gray-200 my-1 border-bottom-none"  />
            <p class="overflow-clip overflow-hidden ... text-gray-900">
            {data.content}
            </p>
            <div class='flex text-gray-700 text-sm '>
            <div class="px-6 py-4">
					
          <button onClick={()=>history.push(`/editor/${data.id}`)} className="inline-block bg-gray-200 rounded-full px-2 py-1 my-2 text-sm font-semibold bg-green-400 hover:bg-green-800 hover:text-white">
               View the notes
              </button>
        </div>
             
                
            </div>
            
        </div>
        <div className="font-light ">
            
                <li className="px-2">
                 Last activity on{" "}{getDate(data?.lastModified?.seconds,data?.lastModified?.nanoseconds)[0]} at {" "}{getDate(data?.lastModified?.seconds,data?.lastModified?.nanoseconds)[1]}
                </li><li className="px-2">	Created on{" "}{getDate(data.createdAt.seconds,data.createdAt.nanoseconds)[0]} at {" "}{getDate(data.createdAt.seconds,data.createdAt.nanoseconds)[1]}
                </li>
                </div> 
    </div>
    )} 
  
</div>
</div>)
:(null)}
<ToastContainer />
        </div>
    )
}

export default Notes
