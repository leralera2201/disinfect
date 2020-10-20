import React, {useEffect} from 'react'
import LoginForm from "../components/LoginForm";
import {GiCube} from 'react-icons/gi'
import {IconContext} from 'react-icons'
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux/rootReducer";
import {useHistory} from 'react-router-dom'

const Home = () => {
    const {token} = useSelector((state: RootReducerType) => state.auth)
    const history = useHistory()

    useEffect(() => {
        if(token){
            history.push('/categories')
        }
    }, [token, history])

    return <div className="home">
        <div className="home-big">
            <IconContext.Provider value={{ color: "white", size: '150px'}}>
                <div>
                    <GiCube />
                </div>
            </IconContext.Provider>
            <div>Welcome to <span>&nbsp;Admin</span></div>
        </div>
        <div className="home-login">
            <LoginForm/>
        </div>
    </div>
}

export default Home
