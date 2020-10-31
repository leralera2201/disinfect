import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux/rootReducer";
import Loading from "./Loading";
import {FaCheck, FaTimes, FaEdit, FaTrashAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import Pagination from "./Pagination";
import store from "../redux/store";
import {deleteOrder, getOrders, OrderInterfaceWithId} from "../redux/actions/order.action";

interface InputProps {
    dispatch: typeof store.dispatch,
    page: number,
    perPage: number,
    setPage: (page: number) => void,
    sortOrder: string,
    setShowModal: (item: OrderInterfaceWithId | null) => void
}

const OrderTable = ({dispatch, page, perPage, setPage, sortOrder, setShowModal}: InputProps) => {

    const {items: {count, orders}, loading, firstLoading} = useSelector((state: RootReducerType) =>  state.orders)

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
            dispatch(getOrders(page, perPage, sortOrder))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, sortOrder])

    const deleteHandler = (item: OrderInterfaceWithId) => {
        let confirmed = window.confirm('Ви впевнені, що бажаєте видалити замовлення "' + item.surname + ' ' + item.name + ' ' + item.totalPrice + '"?')
        if(confirmed){
            dispatch(deleteOrder(item._id))
            dispatch(getOrders(page, perPage,sortOrder))
        }
    }


    return <div className="info-table">
        {firstLoading
            ?
           <Loading/>
            :
            (!loading && orders && orders.length === 0) ?
                'Немає замовлень'
                :
                <>
                    <div style={{overflowX: 'auto'}}>
                        <table className="info-table__table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th style={{minWidth: 150}}>Клієнт</th>
                                <th style={{minWidth: 150}}>Телефон</th>
                                <th style={{minWidth: 500}}>Товар</th>
                                <th>Загальна сума</th>
                                <th style={{minWidth: 200}}>Комент</th>
                                <th style={{minWidth: 200}}>Опис</th>
                                <th>Дата створення</th>
                                <th>Оплачений</th>
                                <th>Активний</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index+1}</th>
                                    <th>{item.surname + " " + item.name}</th>
                                    <th>{item.phone}</th>
                                    <th><table style={{minWidth: 500, background: 'rgb(235 238 241)'}}><tbody>{item.cartItems.map((cartItem, i) => <tr key={i}>
                                        <th style={{minWidth: 50}}>{i+1}</th>
                                        <th><img src={cartItem.product.imageUrl} alt="Product" style={{maxWidth:'100px'}}/></th>
                                        <th>{cartItem.product.title}</th>
                                        <th>{cartItem.product.size/1000}л.</th>
                                        <th>{cartItem.product.newPrice} грн</th>
                                        <th style={{minWidth: 50}}>{cartItem.qty}</th>
                                    </tr>)}</tbody></table></th>
                                    <th>{item.totalPrice} грн</th>
                                    <th>{item.comment ? item.comment : '-'}</th>
                                    <th>{item.description ? item.description : '-'}</th>
                                    <th>{item.createdAt.toString().split('').slice(0,10).join('')}</th>
                                    <th>
                                        {item.isPaid
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

export default OrderTable
