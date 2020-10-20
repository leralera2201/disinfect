import React, {useEffect, useState} from 'react'
import {formValid} from "../formValid";
import {setAlert} from "../redux/actions/alert.action";
import {useDispatch} from "react-redux";
import {ItemInterface} from "../pages/Table";
import {addCategory, getCategories} from "../redux/actions/category.action";

interface InitProps {
   item: ItemInterface | null,
    setShowAdd: (state: boolean) => void,
    page: number,
    perPage: number,
    sortOrder: string
}


const AddFormCategory = ({item, setShowAdd, page, perPage, sortOrder} : InitProps) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        title: '',
        description: '',
        isActive: true,
        errors: {
            title: '',
            description: ''
        }
    })

    useEffect(() => {
        if(item){
            setState({
                title: item.title,
                description: item.description,
                isActive: item.isActive,
                errors: {
                    title: '',
                    description: ''
                }
            })
        }
    }, [item])



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        let errors = {...state.errors}
        switch (name) {
            case 'title':
                errors.title = value.length > 50 ? 'Назва повинна бути менша 50 символів' : ''
                break
            case 'description':
                errors.description = value.length > 300 ? 'Опис повинен містити менше 300 символів' : ''
                break
        }

        setState({...state, [name]: value, errors})
    }

    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name] : e.target.checked})
    }

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formValid(state)){
            if(item?._id) {
                dispatch(addCategory('PUT', {_id: item._id, title: state.title, description: state.description, isActive: state.isActive}))
            }else{
                dispatch(addCategory('POST', {title: state.title, description: state.description, isActive: state.isActive}))
            }
            setShowAdd(false)
            dispatch(getCategories(page, perPage,sortOrder))
        }else{
            dispatch(setAlert({msg: 'Заповніть дані', type: 'danger'}))
        }
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

export default AddFormCategory
