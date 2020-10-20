import React from 'react'
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux/rootReducer";

const PrivateRoute = ({component:Component,  ...rest}: any) => {
    const {token, loading} = useSelector((state: RootReducerType) => state.auth)
    return <Route
        {...rest}
        render={props => !token && !loading ?
            (<Redirect to='/' />)
            :
            (<Component {...props}/>)
    }/>
}



export default PrivateRoute
