const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    }
})

module.exports = model('User', userSchema)
