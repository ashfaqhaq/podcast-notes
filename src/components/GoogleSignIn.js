import React ,{useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function GoogleSignIn() {
 
  const history = useHistory()
   const dispatch = useDispatch() 
   
   useEffect(() => {
    
    
 
  }, [dispatch,history])
  
  return (
    <div>
      <h1>  </h1>
    </div>
  )
}

export default (GoogleSignIn);
