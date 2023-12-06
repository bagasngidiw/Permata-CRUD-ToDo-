const mongoose = require('mongoose')
const {
    categorySchema
} = require('./Category')
const {userSchema} = require( './User')

const Schema = mongoose.Schema


const todolistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Todolist', todolistSchema)