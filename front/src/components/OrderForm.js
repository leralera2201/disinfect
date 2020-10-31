import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {createOrder} from "../store/actions/orderActions";

export const formValid = ({ errors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        (val === null || val === '') && (valid = false);
    });

    return valid;
};
const phoneRegex = RegExp(/((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/)
const nameRegex = RegExp(/^[\u0400-\u04FF]+([\s\.'][\u0400-\u04FF])*$/)

export default function FormDialog({open, handleClose, cartItems}) {
    const totalPrice = cartItems.reduce(((a,c) => a + c.qty * c.product.newPrice), 0)
    const [state, setState] = useState({
        name: '',
        surname: '',
        phone: '',
        errors: {
            name: '',
            surname: '',
            phone: ''
        }
    })
    const {loading} = useSelector(state => state.order)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target
        const errors = {...state.errors}
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
        setState({...state, [name] : value, errors})
    }
    const handleSubmit = () => {
        if(formValid(state)){
            dispatch(createOrder({cartItems, name: state.name, surname: state.surname, phone: state.phone, comment, totalPrice}))
            handleClose()
            setState({
                name: '',
                surname: '',
                phone: '',
                errors: {
                    name: '',
                    surname: '',
                    phone: ''
                }
            })
            setComment('')
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Замовлення</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введіть ваші дані і ми з вами зв'яжемось для підтвердження замовлення! Всього {totalPrice} грн.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="surname"
                        name="surname"
                        value={state.surname}
                        onChange={handleChange}
                        label="Ваше прізвище"
                        type="text"
                        fullWidth
                        error={state.errors.surname.length > 0}
                        helperText={state.errors.surname}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Ваше ім'я"
                        name={"name"}
                        value={state.name}
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        error={state.errors.name.length > 0}
                        helperText={state.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Номер телефону"
                        name={"phone"}
                        value={state.phone}
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        error={state.errors.phone.length > 0}
                        helperText={state.errors.phone}
                    />
                    <TextField
                        margin="dense"
                        id="comment"
                        label="Коментар"
                        name={"comment"}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Відмінити
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {loading ? <CircularProgress/> : 'Замовити'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
