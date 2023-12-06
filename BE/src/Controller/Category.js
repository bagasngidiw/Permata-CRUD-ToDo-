const {Category} = require('../models/Category')
const mongoose = require('mongoose')

// get all category
const getCategory = async (req, res)=> {
    const loginsession = res.locals.loginSession.user

    const category = await Category.find({
        user: loginsession
    }).populate('user')

    res.status(200).json(category)
}

// get a single category
const getCategoryById = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Cant Find Category"})
    }

    const category = await Category.findById(id)

    if(!category){
        return res.status(404).json({error: "Cant Find Category"})
    }

    res.status(200).json(category)
}

// create Category
const createCategory = async (req, res) => {
    const {title, color} = req.body
    const loginsession = res.locals.loginSession.user

    try {
        const category = await Category.create({
            title,
            color,
            user: loginsession
        })
        res.status(201).json({
            category,
            message:"Added New Category"
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// update Category
const updateCategory = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Cant Find Category"
        })
    }

    const category = await Category.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if (!category) {
        return res.status(400).json({
            error: "Cant Update"
        })
    }

    res.status(200).json(category)

}


module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory
}