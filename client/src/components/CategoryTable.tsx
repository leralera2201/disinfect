import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {deleteCategory, getCategories} from "../redux/actions/category.action";
import {RootReducerType} from "../redux/rootReducer";
import Loading from "./Loading";
import {FaCheck, FaTimes, FaEdit, FaTrashAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import Pagination from "./Pagination";
import store from "../redux/store";
import {ItemInterface} from "../pages/Table";

interface InputProps {
    dispatch: typeof store.dispatch,
    page: number,
    perPage: number,
    setPage: (page: number) => void,
    sortOrder: string,
    setShowModal: (item: ItemInterface | null) => void
}

const CategoryTable = ({dispatch, page, perPage, setPage, sortOrder, setShowModal}: InputProps) => {

    const {items: {count, categories}, loading, firstLoading} = useSelector((state: RootReducerType) =>  state.categories)

    useEffect(() => {

        if(perPage > count && page !== 1){
            if(perPage - count > perPage){
                let p = parseInt(((perPage - count)/perPage).toString())
                setPage(p)
            }else{
                setPage(1)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage, count])

    useEffect(() => {
        if(perPage < count || page === 1) {
            dispatch(getCategories(page, perPage, sortOrder))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, sortOrder])

    const deleteHandler = (item: ItemInterface) => {
        let confirmed = window.confirm('Ви впевнені, що бажаєте видалити категорію "' + item.title + '"?')
        if(confirmed){
            dispatch(deleteCategory(item._id))
            dispatch(getCategories(page, perPage,sortOrder))
        }
    }



    return <div className="info-table">
        {firstLoading
            ?
           <Loading/>
            :
            (!loading && categories && categories.length === 0) ?
                'No items'
                :
                <>
            <table className="info-table__table">
                <thead>
                <tr>
                    <th style={{width: '10%'}}>#</th>
                    <th style={{width: '30%'}}>Назва</th>
                    <th style={{width: '40%'}}>Опис</th>
                    <th style={{width: '10%'}}>Активна</th>
                    <th style={{width: '10%'}}>Дії</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((item, index) =>
                    <tr key={item._id}>
                        <th>{index+1}</th>
                        <th>{item.title}</th>
                        <th>{item.description}</th>
                        <th>
                            {item.isActive
                            ?
                                <IconContext.Provider value={{ color: "#10b243", size: "18px"}}>
                                    <div>
                                        <FaCheck />
                                    </div>
                                </IconContext.Provider>
                                :
                                <IconContext.Provider value={{ color: "#DC3545", size: "20px"}}>
                                    <div>
                                        <FaTimes />
                                    </div>
                                </IconContext.Provider>
                        }</th>
                        <th className="info-table__table-btns">
                            <IconContext.Provider value={{ color: "#c0c0c0", size: "18px"}}>
                                <div style={{marginRight: 10, cursor: 'pointer'}} onClick={() => setShowModal(item)}>
                                    <FaEdit />
                                </div>
                            </IconContext.Provider>

                            <IconContext.Provider value={{ color: "#414141", size: "20px"}}>
                                <div style={{cursor: 'pointer'}} onClick={() => deleteHandler(item)}>
                                    <FaTrashAlt />
                                </div>
                            </IconContext.Provider>
                        </th>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} count={count} perPage={perPage}/>
            </>
        }

    </div>
}

export default CategoryTable
