import React, {useEffect, useState} from 'react'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import {IconContext} from "react-icons";

interface InputProps {
    page: number,
    setPage: (page: number) => void,
    count: number,
    perPage: number
}

const Pagination = ({page, setPage, count, perPage}: InputProps) => {

    const [colorPrev, setColorPrev] = useState('#575757')
    const [colorNext, setColorNext] = useState('#575757')
    const totalPages = Math.ceil(count / perPage)

    const setNewPage = (newPage: number) => {
        if(newPage <= totalPages && newPage > 0){
            setPage(newPage)
        }
    }

    useEffect(() => {
        if(page === 1){
            setColorPrev('#cccccc')
        }else {
            setColorPrev('#575757')
        }

        if(page === totalPages){
            setColorNext('#cccccc')
        }else {
            setColorNext('#575757')
        }

    }, [page, totalPages])
    return <div className="pagination">
        <IconContext.Provider value={{ size: "22px", color: colorPrev}}>
            <div style={{ cursor: 'pointer'}} onClick={() => setNewPage(page-1)}>
                <FaAngleLeft />
            </div>
        </IconContext.Provider>
        <div className="pagination-input">{page}</div>
        <div>of</div>
        <div className="pagination-input">{totalPages}</div>
        <IconContext.Provider value={{ size: "22px", color: colorNext}}>
            <div style={{cursor: 'pointer'}} onClick={() => setNewPage(page+1)}>
                <FaAngleRight/>
            </div>
        </IconContext.Provider>
    </div>
}

export default Pagination
