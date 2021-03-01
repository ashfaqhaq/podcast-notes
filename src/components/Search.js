import React,{useState,useEffect } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { localStorage } from 'window-or-global';
function Search() {
    const [search, setSearch] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    // const [error] = useState(false)
    
    const history = useHistory()
   const [list, setList] = useState([])
    useEffect(() => {
        
        axios("https://spotify-refresh-token1.herokuapp.com/refresh_token")
        .then(resp=>{
            // console.log(resp.data.access_token)
            setAccessToken(resp.data.access_token)
            localStorage.setItem("accessToken",resp.data.access_token)
        })

    }, [])

   function handleEpisodeList(id){
    localStorage.setItem("showID",id)
    history.push("/episodes")
    //    console.log('id',id)
    //   <Redirect to="/episodes">
    //       <EpisodeList id={id} accessToken={accessToken} />
    //    </Redirect>
   }
    const handleSearch=()=>{
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        
      
        axios(`https://api.spotify.com/v1/search?q=${search}&type=show&market=IN`,config)
        .then(resp=>{
            console.log(resp.data.shows)
            setList(resp.data.shows)
            setIsLoaded(true);
        })


    }

    return (
        <div>
           
        <div className="bg-white shadow p-4 mt-0 flex center">
        <input className="w-full rounded p-2" type="text" placeholder="Joe Rogan"  onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={handleSearch} className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                <p className="font-semibold text-xs">Search</p>
        </button>
    </div>
{isLoaded?
(<div className="">
 <div class="grid grid-flow-row grid-cols-3 gap-4">
 {list.items.map(data=>
    // <div class="w-full mb-2 md:w-1/2 md:mx-4 border rounded shadow-sm">
    <div class="border rounded shadow-sm">
       
            <img class="rounded" alt="logo" width="360px" height="px" src={data.images[0]?.url} />
      
        <div class="px-4 py-4">
            <div>
                <li href="#" class="font-semibold leading-tight text-1xl text-gray-800 hover:text-gray-800">
                {data.name}
                </li>
            </div>
            <hr class="border-gray-200 my-1 border-bottom-none"  />
            <p class="overflow-clip overflow-hidden ... text-gray-900">
            {data.description}
            </p>
            <div class='flex text-gray-700 text-sm '>
            <div class="px-6 py-4">
					<span class="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{data.total_episodes}</span>
					<span class="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">{data.publisher}</span>
          <button onClick={()=>handleEpisodeList(data.id)} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
               Browse Episodes
              </button>
        </div>
                {/* <div class="pr-3">Total Episodes </div> 
                <div>Posted by <span class="text-red-400"></span></div> */}
            </div>
            
        </div>
    </div>
    )} 
  
</div>
</div>)
:(null)}



</div>
           
        
    )
}

export default Search
