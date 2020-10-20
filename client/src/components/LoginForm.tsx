import React, {useState} from 'react';
import {signInRequest} from "../redux/actions/auth.actions";
import {useDispatch} from "react-redux";
import {formValid} from "../formValid";
import {setAlert} from "../redux/actions/alert.action";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const LoginForm = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        }
    })
    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        let errors = {...state.errors}
        switch (name) {
            case 'email':
                errors.email = emailRegex.test(value) ? '' : 'Email not valid'
                break
            case 'password':
                 errors.password = value.length < 6 ? 'Password can not be less than 6' : ''
                break
        }

        setState({...state, [name]: value, errors})

    }

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if(formValid(state)){
            dispatch(signInRequest({email: state.email, password: state.password}))
            setTimeout(() => {
                setState({
                    email: '',
                    password: '',
                    errors: {
                        email: '',
                        password: ''
                    }
                })
            }, 1000)
        }else{
            dispatch(setAlert({msg: 'Заповніть дані', type: 'danger'}))
        }


    }
    return <div className="login">
        <div className="login-title">Login</div>
        <form className="login-form">
            <input
                type="text"
                name="email"
                placeholder="Input email..."
                className={"login-input "  + (state.errors.email.length ? 'login-input-error' : '')}
                value={state.email}
                onChange={onChange}
            />
            {state.errors.email.length > 0 && <div className="login-input-text-error">{state.errors.email}</div>}
            <input
                type="password"
                name="password"
                placeholder="Input password..."
                className={"login-input " + (state.errors.password.length ? 'login-input-error' : '')}
                value={state.password}
                onChange={onChange}
            />
            {state.errors.password.length > 0 && <div className="login-input-text-error">{state.errors.password}</div>}
            <button className="login-btn" onClick={submitHandler} disabled={state.errors.password.length > 0 || state.errors.email.length > 0}>Login</button>
        </form>
    </div>
}

export default LoginForm
