import React, { Fragment } from 'react'
import Sidebar from '../components/Sidebar'
import { Alert } from 'antd';
import 'antd/dist/antd.css';

function Dashboard() {
    return (
        <Fragment>
            <Sidebar/>
           
            Dashboard
            <Alert
             message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
             type="warning"
             />
        </Fragment>
    )
}

export default Dashboard
