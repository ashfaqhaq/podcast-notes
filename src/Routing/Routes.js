import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
function Routes() {
    return (
        <div>
            <BrowserRouter>
                  <Switch>
                  <Route  path="/dashboard" component={Dashboard} />
                    </Switch>
                    </BrowserRouter>
        </div>
    )
}

export default Routes
