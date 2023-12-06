const express = require('express')
const router = express.Router()
const {
    getTodo,
    getTodoById,
    getTodoByCategory,
    createTodo,
    deleteTodo,
    updateTodo,
    updateStatusTodo
} = require('../Controller/Todolist')

// GetAll Todo
router.get('/', getTodo)

// GET By Id Todo
router.get('/:id', getTodoById)

// GET By Category
router.get('/category/:id', getTodoByCategory)

// POST a new Todo
router.post('/', createTodo)

// DELETE todo
router.delete('/:id', deleteTodo)

// UPDATE todo
router.patch('/:id', updateTodo)

// UPDATE status todo
router.patch('/status/:id', updateStatusTodo)


module.exports = router