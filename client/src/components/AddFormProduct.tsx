import React, {useEffect, useState} from 'react'
import {formValid} from "../formValid";
import {setAlert} from "../redux/actions/alert.action";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import {getCategories} from "../redux/actions/category.action";
import {
    addProduct,
    getProducts,
    ProductPayloadWithIdInterface,
    Sizes,
} from "../redux/actions/product.action";
import {RootReducerType} from "../redux/rootReducer";
import {IconContext} from "react-icons";
import {FaTrashAlt} from "react-icons/fa";

interface InitProps {
   item: ProductPayloadWithIdInterface | null,
    setShowAdd: (state: boolean) => void,
    page: number,
    perPage: number,
    sortOrder: string
}


const AddFormProduct = ({item, setShowAdd, page, perPage, sortOrder} : InitProps) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState<File | null>(null)
    const [imageURL, setImageURL] = useState('')
    const {loading: productLoading, items: {products, count: productCount}} = useSelector((state: RootReducerType) => state.products)
    const {loading: categoryLoading, items: {categories, count: categoryCount}} = useSelector((state: RootReducerType) => state.categories)
    const [state, setState] = useState({
        title: '',
        description: '',
        method: '',
        sizes: [{size: 0, product: ""} as Sizes],
        composition: '',
        size: 0,
        sale: 0,
        category: '',
        brand: '',
        countOfAvailability: 0,
        price: 0,
        country: '',
        isAvailable: true,
        isActive: true,
        errors: {
            title: '',
            description: '',
            method: '',
            composition: '',
            size: '',
            sale: '',
            category: '',
            brand: '',
            countOfAvailability: '',
            price: '',
            country: '',
        }
    })

    useEffect(() => {
        dispatch(getCategories(1, categoryCount, ''))
        dispatch(getProducts(1, productCount, ''))
        if(item){
            setState({
                title: item.title,
                description: item.description,
                country: item.country,
                price: item.price,
                brand: item.brand,
                category: item.category._id,
                sale: item.sale,
                size: item.size,
                composition: item.composition,
                sizes: item.sizes.length > 0 ? item.sizes.map(el => ({size: el.size, product: el.product._id as string})) : [{size: 0, product: ""}],
                method: item.method,
                isActive: item.isActive,
                isAvailable: item.isAvailable,
                countOfAvailability: item.countOfAvailability,
                errors: {
                    title: '',
                    description: '',
                    method: '',
                    composition: '',
                    size: '',
                    sale: '',
                    category: '',
                    brand: '',
                    countOfAvailability: '',
                    price: '',
                    country: '',
                }
            })
            setImageURL(item.imageUrl)
        }
    }, [item])

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let sizes = [...state.sizes];
        sizes[i] = {...sizes[i], [name]: value};
        setState({ ...state, sizes });
    }

    const removeClick = (i: number) => {
        let sizes = [...state.sizes];
        sizes.splice(i, 1);
        setState({ ...state, sizes });
    }

    const onChangeFile = (event: any) => {
        setFile(event.target.files[0])
       setImageURL("")
    }
    const createUI = () => {
        return state.sizes.map((el, i) => (
            <div key={i} style={{display: 'flex', margin: '5px 0'}}>
                <input className="add-sizes-input" placeholder="size"  type="number" name="size" value={el.size ||''} onChange={(e) => handleChange(i, e)} />
                <select className="add-sizes-select" id="product" name="product" value={el.product || '--------'} onChange={(e) => handleChange(i, e)}>
                    <option disabled value={'--------'}>--------</option>
                    {!productLoading && products && products.map(el => <option key={el._id} value={el._id}>
                        {el.title} - {el.size}
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
            case 'title':
                errors.title = value.length > 50 ? 'Назва повинна бути менша 50 символів' : ''
                break
            case 'country':
                errors.country = value.length > 50 ? 'Країна повинна бути менша 50 символів' : ''
                break
            case 'brand':
                errors.brand = value.length > 50 ? 'Бренд повинен бути меншим 50 символів' : ''
                break
            case 'description':
                errors.description = value.length > 300 ? 'Опис повинен містити менше 300 символів' : ''
                break
            case 'method':
                errors.method = value.length > 300 ? 'Метод повинен містити менше 300 символів' : ''
                break
            case 'composition':
                errors.composition = value.length > 300 ? 'Склад повинен містити менше 300 символів' : ''
                break
            case 'category':
                errors.category = value.length === 0 ? 'Будь ласка виберіть категорію' : ''
                break
            case 'price':
                errors.price = parseFloat(value) < 0 ? 'Ціна повинна бути більше 0' : ''
                break
            case 'sale':
                errors.sale = parseFloat(value) < 0 || parseFloat(value) > 99 ? 'Знижка повинна бути в межах 0-99' : ''
                break
            case 'size':
                errors.size = parseFloat(value) < 0 ? 'Розмір повинен бути більшим 0' : ''
                break
            case 'countOfAvailability':
                errors.countOfAvailability = parseFloat(value) < 0 ? 'Кількість повинна бути більшим 0' : ''
                break

        }

        setState({...state, [name]: value, errors})
    }
    const addClick = () => {
        setState({
            ...state,
            sizes: [...state.sizes, { size: 0, product: ""}]
        })
    }
    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name] : e.target.checked})
    }

    const onSubmitForm = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(file){
            if(formValid(state)){
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'restaurant');
                formData.append('cloud_name', 'lera-cloud-storage');
                const uploadData = await axios.post('https://api.cloudinary.com/v1_1/lera-cloud-storage/image/upload', formData)
                dispatchSaveProduct(uploadData.data.url)

            }else{
                dispatch(setAlert({msg: 'Заповніть дані', type: 'danger'}))
            }
        }else{
            if (formValid(state) && imageURL){
                dispatchSaveProduct(imageURL)
            }else {
                dispatch(setAlert({msg: 'Заповніть дані', type: 'danger'}))
            }
        }
    }

    const dispatchSaveProduct = (img: string) => {
        const sizes = state.sizes.filter(el => el.size > 0 && el.product.length > 0)
        if(item?._id) {
            dispatch(addProduct('PUT',
                {_id: item._id, title: state.title, description: state.description,
                    isAvailable: state.isAvailable, size: state.size, sale: state.sale,
                    method: state.method, composition: state.composition, brand: state.brand,
                    countOfAvailability: state.countOfAvailability, country: state.country, price: state.price,
                    category: state.category, imageUrl: img, newPrice: state.price - (state.price * (state.sale / 100)),
                    sizes: sizes, isActive: state.isActive}))
        }else{
            dispatch(addProduct('POST', {title: state.title, description: state.description,
                isAvailable: state.isAvailable, size: state.size, sale: state.sale,
                method: state.method, composition: state.composition, brand: state.brand,
                countOfAvailability: state.countOfAvailability, country: state.country, price: state.price,
                category: state.category, imageUrl: img, newPrice: state.price - (state.price * (state.sale / 100)),
                sizes: sizes, isActive: state.isActive}))
        }
        setShowAdd(false)
        dispatch(getProducts(page, perPage,sortOrder))
    }
    return <div className="add">
        <div className="table-header-title add-title">{item ? 'Редагувати запис' : 'Додати запис'}</div>
        <form onSubmit={onSubmitForm} className={"add-form"}>
            <div className="add-form-div">
                <label htmlFor="title">Назва категорії</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.title.length ? 'login-input-error' : '')}
                />
                {state.errors.title.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.title}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="description">Опис категорії</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.description.length ? 'login-input-error' : '')}
                />
                {state.errors.description.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.description}</div>}
            </div>
            <div className="add-form-div" style={{margin: '30px 0'}}>
                {imageURL && <img src={imageURL} alt="" style={{maxWidth: '280px', marginBottom: '30px', display: 'block'}}/>}
                <label htmlFor="file-upload" className="custom-file-upload">
                    {file ? file.name : 'Upload file'}
                </label>
                <input id="file-upload" type="file" name="myImage" onChange= {onChangeFile} />
            </div>
            <div className="add-form-div">
                <label htmlFor="brand">Бренд</label>
                <input
                    id="brand"
                    type="text"
                    name="brand"
                    value={state.brand}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.brand.length ? 'login-input-error' : '')}
                />
                {state.errors.brand.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.brand}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="country">Країна</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={state.country}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.country.length ? 'login-input-error' : '')}
                />
                {state.errors.country.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.country}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="method">Метод</label>
                <input
                    id="method"
                    type="text"
                    name="method"
                    value={state.method}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.method.length ? 'login-input-error' : '')}
                />
                {state.errors.method.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.method}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="composition">Склад</label>
                <input
                    id="composition"
                    type="text"
                    name="composition"
                    value={state.composition}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.composition.length ? 'login-input-error' : '')}
                />
                {state.errors.composition.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.composition}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="price">Ціна</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    value={state.price}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.price.length ? 'login-input-error' : '')}
                />
                {state.errors.price.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.price}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="sale">Знижка</label>
                <input
                    id="sale"
                    type="number"
                    name="sale"
                    value={state.sale}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.sale.length ? 'login-input-error' : '')}
                />
                {state.errors.sale.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.sale}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="size">Розмір</label>
                <input
                    id="size"
                    type="number"
                    name="size"
                    value={state.size}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.size.length ? 'login-input-error' : '')}
                />
                {state.errors.size.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.size}</div>}
            </div>
            <div className="add-form-div">
                <label htmlFor="countOfAvailability">Кількість в наявності</label>
                <input
                    id="countOfAvailability"
                    type="number"
                    name="countOfAvailability"
                    value={state.countOfAvailability}
                    onChange={onChange}
                    className={"add-form-input " + (state.errors.countOfAvailability.length ? 'login-input-error' : '')}
                />
                {state.errors.countOfAvailability.length > 0 && <div className="login-input-text-error" style={{marginBottom: 10}}>{state.errors.countOfAvailability}</div>}
            </div>
            <div className="add-form-div div-select">
                <label htmlFor="category">Виберіть категорію</label>
                <select id="category" value={state.category.length > 0 ? state.category : '--------'} onChange={(e) => setState({...state, category: e.target.value})}>
                    <option disabled value={'--------'}>--------</option>
                    {!categoryLoading && categories && categories.map(el => <option key={el._id} value={el._id}>
                        {el.title}
                    </option>)}
                </select>
            </div>
            <div className="add-form-div">
                {createUI()}
                <input type='button' value='Додати' onClick={addClick}/>
            </div>

            <div className="add-form-div-checkbox add-form-div">
                <label htmlFor="isAvailable">Є в наявності</label>
                <label className="checkbox bounce" >
                    <input type="checkbox" id="isAvailable" name="isAvailable" checked={state.isAvailable} onChange={onChangeCheckbox}/>
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
                    disabled={state.errors.title.length > 0 || state.errors.description.length > 0}
                >
                    Зберегти
                </button>
            </div>
        </form>
    </div>
}

export default AddFormProduct
