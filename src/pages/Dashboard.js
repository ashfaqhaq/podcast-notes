import React, { Fragment } from 'react'
import Sidebar from '../components/Sidebar'
import { Alert } from 'antd';
import Editor from '../components/Editor/Editor'
import 'antd/dist/antd.css';

function Dashboard() {
    return (
        <Fragment>
            <Sidebar/>
           
            Dashboard
            <Alert
             message="Warning text"
             type="warning"
             />
             <Editor />
        </Fragment>
    )
}

export default Dashboard
