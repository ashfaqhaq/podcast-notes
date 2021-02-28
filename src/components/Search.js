import React,{useState,useEffect,useRef } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import EpisodeList from './EpisodeList';
function Search() {
    const [search, setSearch] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [episodes, setEpisodes] = useState([])

   const [list, setList] = useState([])
    useEffect(() => {
        
        axios("https://spotify-refresh-token1.herokuapp.com/refresh_token")
        .then(resp=>{
            console.log(resp.data.access_token)
            setAccessToken(resp.data.access_token)
            
        })

    }, [])

   function handleEpisodeList(id,accessToken){
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
   axios.get(`https://api.spotify.com/v1/shows/${id}/episodes?market=IN`,config)
    .then(resp=>{setEpisodes(resp.data.items)})
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
           <input 
           value={search}
           onChange={(e)=>setSearch(e.target.value)}
           className="shadow appearance-none border rounded py-2 px-3 text-grey-darker" />
           <div className="bg-white shadow p-4 mt-0 flex center">
             <button onClick={handleSearch}>
                 Search
                  </button>  
        <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            {/* <i className="material-icons text-3xl">search</i> */}
        </span>
        <input className="w-full rounded p-2" type="text" placeholder="Try 'Los Angeles'" />
        <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                <p className="font-semibold text-xs">Search</p>
        </button>
    </div>
{isLoaded?
(<main className="grid place-items-center min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
  <div>
    <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-400 mb-5">Results matching: {search}</h1>
    <section class="flex flex-nowrap">
      {/* <!-- CARD 1 --> */}
    {list.items.map(data=>

      <div class="bg-gray-900 shadow-lg rounded p-3">
        <div class="group relative">
            
          <img class="w-full md:w-72 block rounded" src={data.images[0]?.url} alt="sdsd" />
          <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>

            <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            </button>

            <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-white text-lg">{data.name}</h3>
          <p class="text-gray-400">{data.publisher}</p>
          <p class="text-gray-400">No of.Episodes:{data.total_episodes}</p>
          <button onClick={()=>handleEpisodeList(data.id,accessToken)} className="text-white">
                Get all episodes list
              </button>
             
        </div>
      </div>
 )}  {/* <!-- END OF CARD 1 --> */}

    
    </section>
    {episodes?
   ( episodes.map(ep=>
    <Link to={{
        pathname: "/editor",
        search: `?id=${ep.id}`
      }}>
  <li key={ep.id}

       
        className="p-4 m-4">
       { ep.name}

    </li>
    </Link>
    )):null}
  </div>
</main>)
:(null)}

</div>
           
        
    )
}

export default Search
