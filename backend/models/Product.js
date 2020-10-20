const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String
    },
    imageUrl: {
      type: String
    },
    method: {
        type: String
    },
    composition: {
        type: String
    },
    size: {
      type: Number,
      required: true
    },
    sizes: {
      type: [{
          size: Number,
          product: {type: Schema.Types.ObjectId, ref: 'Product'}
      }]
    },
    price: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        default: 0
    },
    newPrice: {
      type: Number
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    countOfAvailability: {
        type: Number,
        default: 0
    },
    brand: {
        type: String
    },
    country: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})


module.exports = model('Product', productSchema)
