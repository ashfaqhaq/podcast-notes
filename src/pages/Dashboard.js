import React, { Fragment } from 'react'

import Sidebar from '../components/Sidebar'

import Editor from '../components/Editor/Editor'


function Dashboard() {
    return (
        <Fragment>
            <div className="flex">
                <div>
            <Sidebar/>
            </div>
            <div className="m-40">
            <Editor />
            </div>
           
            
             </div>
        </Fragment>
    )
}

export default Dashboard