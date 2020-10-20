import React from 'react'
import {GiCube} from "react-icons/gi";
import {ImTable2} from "react-icons/im";
import {FaThList} from "react-icons/fa";
import {RiFileListLine} from "react-icons/ri";
import {FiLogOut} from "react-icons/fi";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/actions/auth.actions";

interface InputProps {
    myRef: React.Ref<HTMLDivElement>,
    onHover: (e: React.MouseEvent<HTMLDivElement>) => void,
    onUnHover: (e: React.MouseEvent<HTMLDivElement>) => void,
    width: number
}

const LeftSideBar = ({myRef, onHover, onUnHover, width}: InputProps) => {

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logOut())
    }
    return <div className="left" ref={myRef} onMouseMove={onHover} onMouseOut={onUnHover}>
        <IconContext.Provider value={{ color: "white", size: '50px'}}>
            <div>
                <GiCube />
            </div>
        </IconContext.Provider>
        <hr/>
        <div className="left-menu">
            <Link to={'/categories'} className="left-menu-item">
                <IconContext.Provider value={{ color: "rgba(256,256,256,0.5)", size: '25px'}}>
                    <div className="pr-20">
                        <ImTable2 />
                    </div>
                </IconContext.Provider>
                {width > 0 && 'Categories'}
            </Link>
            <Link to={'/products'} className="left-menu-item">
                <IconContext.Provider value={{ color: "rgba(256,256,256,0.5)", size: '25px'}}>
                    <div className="pr-20">
                        <FaThList />
                    </div>
                </IconContext.Provider>
                {width > 0 && 'Products'}
            </Link>
            <Link to={'/orders'} className="left-menu-item">
                <IconContext.Provider value={{ color: "rgba(256,256,256,0.5)", size: '25px'}}>
                    <div className="pr-20">
                        <RiFileListLine />
                    </div>
                </IconContext.Provider>
                {width > 0 && 'Orders'}
            </Link>
            <div className="left-menu-item left-menu-item-fixed" onClick={logout}>
                <IconContext.Provider value={{ color: "rgba(256,256,256,0.5)", size: '25px'}}>
                    <div className="pr-20">
                        <FiLogOut />
                    </div>
                </IconContext.Provider>
                {width > 0 && 'Logout'}
            </div>
        </div>
    </div>
}

export default LeftSideBar
