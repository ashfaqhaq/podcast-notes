import React, { Fragment } from 'react'
import Sidebar from '../components/Sidebar'

import Editor from '../components/Editor/Editor'


function Dashboard() {
    return (
        <Fragment>
            <Sidebar/>
           
            Dashboard
           
             <Editor />
        </Fragment>
    )
}

export default Dashboard
