import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux/rootReducer";
import Loading from "./Loading";
import {FaCheck, FaTimes, FaEdit, FaTrashAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import Pagination from "./Pagination";
import store from "../redux/store";
import {deleteProduct, getProducts, ProductPayloadWithIdInterface} from "../redux/actions/product.action";

interface InputProps {
    dispatch: typeof store.dispatch,
    page: number,
    perPage: number,
    setPage: (page: number) => void,
    sortOrder: string,
    setShowModal: (item: ProductPayloadWithIdInterface | null) => void
}

const ProductTable = ({dispatch, page, perPage, setPage, sortOrder, setShowModal}: InputProps) => {

    const {items: {count, products}, loading, firstLoading} = useSelector((state: RootReducerType) =>  state.products)

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
            dispatch(getProducts(page, perPage, sortOrder))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, sortOrder])

    const deleteHandler = (item: ProductPayloadWithIdInterface) => {
        let confirmed = window.confirm('Ви впевнені, що бажаєте видалити товар "' + item.title + '"?')
        if(confirmed){
            dispatch(deleteProduct(item._id))
            dispatch(getProducts(page, perPage,sortOrder))
        }
    }




    return <div className="info-table">
        {firstLoading
            ?
           <Loading/>
            :
            (!loading && products && products.length === 0) ?
                'No items'
                :
                <>
                    <div style={{overflowX: 'auto'}}>
                        <table className="info-table__table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th style={{minWidth: 150}}>Фото</th>
                                <th style={{minWidth: 150}}>Назва</th>
                                <th style={{minWidth: 150}}>Опис</th>
                                <th style={{minWidth: 150}}>Категорія</th>
                                <th style={{minWidth: 150}}>Склад</th>
                                <th style={{minWidth: 150}}>Застосування</th>
                                <th>Бренд</th>
                                <th>Ціна</th>
                                <th>Знижка</th>
                                <th>Нова ціна</th>
                                <th>Розмір</th>
                                <th>Розміри</th>
                                <th>Кількість в наявності</th>
                                <th>Країна</th>
                                <th>Активна</th>
                                <th>В наявності</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index+1}</th>
                                    <th><img src={item.imageUrl} alt="Product" style={{maxWidth:'100px'}}/></th>
                                    <th>{item.title}</th>
                                    <th>{item.description ?? '-'}</th>
                                    <th>{item.category.title ?? '-'}</th>
                                    <th>{item.composition}</th>
                                    <th>{item.method}</th>
                                    <th>{item.brand}</th>
                                    <th>{item.price}</th>
                                    <th>{item.sale}</th>
                                    <th>{item.newPrice}</th>
                                    <th>{item.size}</th>
                                    <th>{item.sizes.length > 0 ?
                                        item.sizes.map(el => el.size).join(' | ')
                                        : '-'
                                    }</th>
                                    <th>{item.countOfAvailability}</th>
                                    <th>{item.country}</th>
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
                                    <th>
                                        {item.isAvailable
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
                                    <th >
                                        <div className="info-table__table-btns">
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
                                        </div>

                                    </th>


                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

            <Pagination page={page} setPage={setPage} count={count} perPage={perPage}/>
            </>
        }

    </div>
}

export default ProductTable
