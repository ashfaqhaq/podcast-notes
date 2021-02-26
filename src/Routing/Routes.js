import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Landing from '../Pages/Landing';
function Routes() {
    return (
        <div>
            <BrowserRouter>
                  <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route  path="/dashboard" component={Dashboard} />
                 
                    </Switch>
                    </BrowserRouter>
        </div>
    )
}

export default Routes
