import React from 'react'
import { Route, Switch} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
function Routes() {
    return (
        <div>
                  <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                    </Switch>
        </div>
    )
}

export default Routes
