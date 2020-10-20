import React from 'react'
import {FiMoreHorizontal} from 'react-icons/fi'
import {ItemInterface} from "../pages/Table";

interface InputProps {
    title: string,
    setShowWindow: (s: boolean) => void,
    showMenu: boolean,
    setShowAdd: (item: ItemInterface | null) => void
}
const TableHeader = ({title, setShowWindow, showMenu, setShowAdd}: InputProps) => {

    return <div className="table-header">
        <div className="table-header-title">{title}</div>
        <div className="table-header-buttons table-buttons">
            <button className="table-header-btn-more" style={{ padding: "12px 20px"}} onClick={()=>setShowWindow(!showMenu)}>
                <FiMoreHorizontal onClick={()=> setShowWindow(!showMenu)}/>
            </button>
            <button className="table-header-btn-add" onClick={() => setShowAdd(null)}>Add</button>
        </div>
    </div>
}

export default TableHeader
