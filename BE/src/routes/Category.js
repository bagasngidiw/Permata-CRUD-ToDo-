const express = require('express')
const router = express.Router()
const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory
} = require('../Controller/Category')


// GetAll Category
router.get('/', getCategory)

// GET By Id Category
router.get('/:id', getCategoryById)

// POST a new Category
router.post('/', createCategory)

// Update Category
router.patch('/:id', updateCategory)


module.exports = router