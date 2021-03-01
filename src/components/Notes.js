import React from 'react'

function Notes() {
    const search="sdasd" 
    return (
        <div>
           <input 
           value={search}
        //    onChange={(e)=>setSearch(e.target.value)}
           className="shadow appearance-none border rounded py-2 px-3 text-grey-darker" />
           <div className="bg-white shadow p-4 mt-0 flex center">
             <button>
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
        </div>
    )
}

export default Notes
