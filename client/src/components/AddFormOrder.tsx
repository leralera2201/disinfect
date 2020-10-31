import React, {useEffect, useState} from 'react'
import {formValid, nameRegex, phoneRegex} from "../formValid";
import {setAlert} from "../redux/actions/alert.action";
import {useDispatch, useSelector} from "react-redux";
import {
    getProducts, ProductPayloadWithIdInterface,
} from "../redux/actions/product.action";
import {RootReducerType} from "../redux/rootReducer";
import {IconContext} from "react-icons";
import {FaTrashAlt} from "react-icons/fa";
import {addOrder, CartItem, getOrders, OrderInterfaceWithId} from "../redux/actions/order.action";

interface InitProps {
   item: OrderInterfaceWithId | null,
    setShowAdd: (state: boolean) => void,
    page: number,
    perPage: number,
    sortOrder: string
}

// interface CartItems{
//    qty: number,
//    product: ProductPayloadWithIdInterface
// }

const AddFormOrder = ({item, setShowAdd, page, perPage, sortOrder} : InitProps) => {
    const dispatch = useDispatch()
    const {loading: productLoading, items: {products, count: productCount}} = useSelector((state: RootReducerType) => state.products)
    const [comment, setComment] = useState('')
    const [description, setDescription] = useState('')
    const [state, setState] = useState({
        surname: '',
        name: '',
        phone: '',
        cartItems: [{qty: 0, product: {}}] as CartItem[],
        totalPrice: 0,
        createdAt: new Date(),
        isPaid: false,
        isActive: true,
        errors: {
            surname: '',
            name: '',
            phone: ''
        }
    })
    useEffect(() => {
        dispatch(getProducts(1, productCount, ''))
        if(item){
            setState({
                name: item.name,
                surname: item.surname,
                phone: item.phone,
                totalPrice: item.totalPrice,
                createdAt: item.createdAt,
                cartItems: item.cartItems,
                isActive: item.isActive,
                isPaid: item.isPaid,
                errors: {
                    surname: '',
                    name: '',
                    phone: '',
                }
            })
            setComment(item.comment)
            setDescription(item.description)
        }
    }, [item])

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let product = null
        let cartItems = [...state.cartItems]

        if(name === 'product'){
            product = products.find(el => el._id === value)
            let index = cartItems.findIndex(el => el.product._id === value)
            if(index !== -1){
                cartItems[index] = [...state.cartItems][index]
                if(cartItems[i].qty){
                    cartItems[index].qty += cartItems[i].qty
                }else{
                    cartItems[index].qty += 1
                }
                cartItems[i] = {qty: 0, product: {} as ProductPayloadWithIdInterface}
            }else if(product){
                cartItems[i] = {...cartItems[i], product: product};
            }
        }else{
            cartItems[i] = {...cartItems[i], [name]: parseInt(value)};
        }
        setState({ ...state, cartItems });
    }

    const removeClick = (i: number) => {
        let cartItems = [...state.cartItems];
        cartItems.splice(i, 1);
        setState({ ...state, cartItems });
    }


    const createUI = () => {
        return state.cartItems.map((el, i) => (
            <div key={i} style={{display: 'flex', margin: '5px 0'}}>
                <input className="add-sizes-input" placeholder="Кількість"  type="number" name="qty" value={el.qty ||''} onChange={(e) => handleChange(i, e)} />
                <select className="add-sizes-select" id="product" name="product" value={el.product._id || '--------'} onChange={(e) => handleChange(i, e)}>
                    <option disabled value={'--------'}>--------</option>
                    {!productLoading && products.length > 0 && products.map(el => <option key={el._id} value={el._id}>
                        {el.title} - {el.size/1000}л.
                    </option>)}
                </select>
                <button> <IconContext.Provider value={{ color: "#414141", size: "20px"}}>
                    <div style={{cursor: 'pointer'}} onClick={() => removeClick(i)}>
                        <FaTrashAlt />
                    </div>
                </IconContext.Provider></button>
            </div>
        ))
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        let errors = {...state.errors}
        switch (name) {
            case 'name':
                errors.name = value.length < 2 ? 'Ім\'я має містити мінімум 2 символи' : nameRegex.test(value) ? '' : 'Введіть правильне прізвище'
                break
            case 'surname':
                errors.surname = value.length < 2 ? 'Прізвище має містити мінімум 2 символи' : nameRegex.test(value) ? '' : 'Введіть правильне ім\'я'
                break
            case 'phone':
                errors.phone = value.length === 0 ? 'Введіть телефон' : phoneRegex.test(value) ? '' : 'Введіть  правильний телефон'
                break
        }

        setState({...state, [name]: value, errors})
    }
    const addClick = () => {
        setState({
            ...state,
            cartItems: [...state.cartItems, { qty: 0, product: {}} as CartItem]
        })
    }
    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name] : e.target.checked})
    }

    const onSubmitForm = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(state)
        if(state.cartItems.filter(el => el.qty > 0 && el.product._id).length === 0){
            dispatch(setAlert({msg: 'Потрібно додати товар до замовлення!', type: 'danger'}))
        }else{
            if(formValid(state)){
                dispatchSaveProduct()
            }else{
                dispatch(setAlert({msg: 'Заповніть дані', type: 'danger'}))
            }
        }
    }

    const dispatchSaveProduct = () => {
        const cartItems = state.cartItems.filter(el => el.qty > 0 && el.product._id)
        const totalPrice = cartItems.reduce(((a,c) => a + c.qty*c.product.newPrice), 0)
        // const finalCartItems = cartItems.map(el => ({qty: el.qty, product: el.product._id}))
        if(item?._id) {
            dispatch(addOrder('PUT',
                {_id: item._id, name: state.name, description: description, comment: comment,
                    isPaid: state.isPaid, surname: state.surname, phone: state.phone,
                    totalPrice, createdAt: state.createdAt,
                    cartItems: cartItems, isActive: state.isActive}))
        }else{
            dispatch(addOrder('POST', {name: state.name, description: description, comment: comment,
                isPaid: state.isPaid, surname: state.surname, phone: state.phone,
                totalPrice, createdAt: state.createdAt,
                cartItems: cartItems, isActive: state.isActive}))
        }
        setShowAdd(false)
        dispatch(getOrders(page, perPage,sortOrder))
    }


    return <div className="add">
        <div className="table-header-title add-title">{item ? 'Редагувати запис' : 'Додати запис'}</div>
        <form onSubmit={onSubmitForm} className={"add-form"}>
            <div className="add-form-div">
                <label htmlFor="title">Ім'я клієнта</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.name.length ? 'login-input-error' : '')}
                />
                {state.errors.name.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.name}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="title">Прізвище</label>
                <input
                    id="surname"
                    type="text"
                    name="surname"
                    value={state.surname}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.surname.length ? 'login-input-error' : '')}
                />
                {state.errors.surname.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.surname}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="title">Телефон</label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={state.phone}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.phone.length ? 'login-input-error' : '')}
                />
                {state.errors.phone.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.phone}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="description">Опис</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={"add-form-input "}
                />
            </div>

            <div className="add-form-div">
                {createUI()}
                <input type='button' value='Додати' onClick={addClick}/>
            </div>

            <div className="add-form-div-checkbox add-form-div">
                <label htmlFor="isAvailable">Оплачено</label>
                <label className="checkbox bounce" >
                    <input type="checkbox" id="isPaid" name="isPaid" checked={state.isPaid} onChange={onChangeCheckbox}/>
                    <svg viewBox="0 0 21 21">
                        <polyline points="5 10.75 8.5 14.25 16 6"/>
                    </svg>
                </label>
            </div>
            <div className="add-form-div-checkbox add-form-div">
                <label htmlFor="isActive">Відображати на сайті</label>
                <label className="checkbox bounce" >
                    <input type="checkbox" id="isActive" name="isActive" checked={state.isActive} onChange={onChangeCheckbox}/>
                    <svg viewBox="0 0 21 21">
                        <polyline points="5 10.75 8.5 14.25 16 6"/>
                    </svg>
                </label>
            </div>
            <div className="table-header-buttons">
                <button type="button" className="table-header-btn-more" onClick={() => setShowAdd(false)}>Відмінити</button>
                <button
                    type="submit"
                    className="table-header-btn-add"
                    disabled={state.errors.name.length > 0 || state.errors.surname.length > 0 || state.errors.phone.length > 0}
                >
                    Зберегти
                </button>
            </div>
        </form>
    </div>
}

export default AddFormOrder
