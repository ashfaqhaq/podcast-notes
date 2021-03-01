import React ,{useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function GoogleSignIn() {
 
  const history = useHistory()
   const dispatch = useDispatch() 
   console.log("erere")
   useEffect(() => {
     console.log("erere")
    
 
  }, [dispatch,history])
  
  return (
    <div>
      <h1>  </h1>
    </div>
  )
}

export default (GoogleSignIn);
