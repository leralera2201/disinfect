const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    surname: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: ''
    },
    comment: {
        type: String
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cartItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: {
            type: Number,
            required: true
        },
    }],
    isPaid: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})


module.exports = model('Order', orderSchema)
