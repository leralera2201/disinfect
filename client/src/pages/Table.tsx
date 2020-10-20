import React, {useEffect, useRef, useState} from 'react'
import {useRouteMatch} from 'react-router-dom'
import LeftSideBar from "../components/LeftSideBar";
import TableHeader from "../components/TableHeader";
import CategoryTable from "../components/CategoryTable";
import {useDispatch} from "react-redux";
import AddFormCategory from "../components/AddFormCategory";
import ProductTable from "../components/ProductTable";
import AddFormProduct from "../components/AddFormProduct";
import {ProductPayloadWithIdInterface} from "../redux/actions/product.action";

export interface ItemInterface {
    _id: string
    title: string
    description: string
    isActive: boolean
}

const Table = () => {
    const [width, setWidth] = useState(0)
    const [showModalAdd, setShowModalAdd] = useState(false)

    // const [showModalEdit, setShowModalEdit] = useState(false)
    const [item, setItem] = useState<ItemInterface | null>(null)
    const [productItem, setProductItem] = useState<ProductPayloadWithIdInterface | null>(null)
    const [sortOrder, setSortOrder] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const myRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const [pageURL, setPageURL] = useState('categories')

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const setShowMode = (item: ItemInterface | null) => {
        setShowModalAdd(true)
        setItem(item)
    }
    useEffect(() => {
        if(showModalAdd === false){
            setItem(null)
            setProductItem(null)
        }
    }, [showModalAdd])

    const setShowModeForProduct = (item: ProductPayloadWithIdInterface | null) => {
        setShowModalAdd(true)
        setProductItem(item)
    }

    useEffect(() => {
        if(match.path === '/categories'){
            setPageURL('categories')
        }else if(match.path === '/orders'){
            setPageURL('orders')
        }else if(match.path === '/products'){
            setPageURL('products')
        }
    }, [match])

    let marginLeft = width === 0 ? '90px' : '290px'

    const setWindowOpen = (e: MouseEvent) => {
        if(!(e.target as Element).classList.contains("table-header-btn-more")
            && !(e.target as Element).parentElement?.classList.contains("table-header-btn-more")
            && !(e.target as Element).parentElement?.parentElement?.classList.contains("table-header-btn-more")
        ){
            setShowMenu(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', setWindowOpen)

        return () => {
            window.removeEventListener('click', setWindowOpen)
        }

    }, [])


    const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
        setWidth(e.currentTarget.offsetWidth)
    }

    const onUnHover = (e: React.MouseEvent<HTMLDivElement>) => {
        setWidth(0)
    }

    const setPerPageRow = (count: number) => {
        setPerPage(count)
    }

    return <div className="overall">
        <LeftSideBar onHover={onHover} onUnHover={onUnHover} width={width} myRef={myRef}/>
        <div className={`table ${pageURL === 'categories' && 'table100'}`} style={{marginLeft: marginLeft}}>
            <TableHeader
                title={
                    pageURL === 'categories' ? 'Categories':
                        pageURL === 'orders' ? 'Orders' : 'Products'
                }
                setShowWindow={setShowMenu} showMenu={showMenu} setShowAdd={setShowMode}/>
            {showMenu && <div className="menu">
                <div className="menu-item" onClick={() => setPerPageRow(10)}>Показувати 10 записів</div>
                <div className="menu-item" onClick={() => setPerPage(25)}>Показувати 25 записів</div>
                <hr/>
                <div className="menu-item" onClick={() => setSortOrder('title')}>Сортувати за назвою</div>
                <div className="menu-item" onClick={() => setSortOrder('')}>Сортувати за новизною</div>
            </div>
            }
            {pageURL === 'categories' && <>
                <CategoryTable
                    dispatch={dispatch}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                    sortOrder={sortOrder}
                    setShowModal={setShowMode}
                />
                {
                    showModalAdd &&  <div className="modal">
                        <AddFormCategory setShowAdd={setShowModalAdd} item={item} page={page} perPage={perPage} sortOrder={sortOrder}/>
                    </div>
                }

            </>}

            {pageURL === 'products' && <>
                <ProductTable
                    dispatch={dispatch}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                    sortOrder={sortOrder}
                    setShowModal={setShowModeForProduct}
                />
                {
                    showModalAdd &&  <div className="modal">
                        <AddFormProduct
                            setShowAdd={setShowModalAdd}
                            item={productItem}
                            page={page}
                            perPage={perPage}
                            sortOrder={sortOrder}
                        />
                    </div>
                }

            </>}


        </div>
    </div>
}

export default Table
