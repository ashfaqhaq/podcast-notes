import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useLocation,Link } from 'react-router-dom'
import { localStorage } from 'window-or-global'
function EpisodeList() {
    const [episodes, setEpisodes] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState([])
    
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        };
       axios.get(`https://api.spotify.com/v1/shows/${localStorage.getItem("showID")}/episodes?market=IN`,config)
        .then(resp=>{setEpisodes(resp.data.items)})
        
        .catch((err)=>{setError(err)})
    }, [])
    const location = useLocation()
    console.log(location)
    return (
        <div>
            {/* {error?<p>An error Occured: Try refreshing the page. If the issue still persist. Try to logout and login again {error} </p>: null} */}
            <div className="p-10">
    {episodes?.map(items=>{
        return( 
        <div className=" w-full lg:max-w-full lg:flex my-2">
        <img src={items.images[0]?.url} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"  alt="episode" />
        
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            
            <div className="text-gray-900 font-bold text-xl mb-2">{items.name}</div>
            <p className="text-gray-700 text-base">{items.description}</p>
          </div>
          <div className="flex items-center">
            
            <div className="text-sm">
             
              <p className="text-red-500">Release Date: {items.release_date}</p>
              <Link to={{
        pathname: "/editor/"+items.id
      }}>
              <button className="rounded bg-green-500 px-5 mx-5 text-bold text-white "> Play </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
        
        )}
    )}
   
        </div>
        </div>
    )
}

export default EpisodeList
