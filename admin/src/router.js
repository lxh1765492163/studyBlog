import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './login';
import AdminIndex from './adminIndex';

function NotFount(){
    return <div>404</div>
}

function router(props){
    console.log(props)
    return (
        <Router>      
            <Switch>

                <Route path="/" exact component={Login} />
                <Route path="/index/" render={(props)=>{
                    const data = window.sessionStorage.getItem("openId")
                    ?
                    <AdminIndex {...props} />
                    :
                    <Redirect to={{pathname:"/", state:{from: props.location}}} />
                    return data
                }} />
                <Route component={NotFount} />
            </Switch>
        </Router>
    )
}
export default router
