const mongoose = require('mongoose')


const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = {
    categorySchema,
    Category
}
