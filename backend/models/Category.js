const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Category', categorySchema)
