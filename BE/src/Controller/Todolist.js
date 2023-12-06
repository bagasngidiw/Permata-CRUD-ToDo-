const Todolist = require('../models/Todolist')
const mongoose = require('mongoose')

// get alla todo
const getTodo = async (req, res) => {
    const loginsession = res.locals.loginSession.user

    const todo = await Todolist.find({
            user: loginsession
        })
        .populate('user')
        .populate('category').
    exec()


    res.status(200).json(todo)
}

// get a single todo
const getTodoById = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Cant Find Todo"
        })
    }

    const todo = await Todolist.findById(id)

    if (!todo) {
        return res.status(404).json({
            error: "Cant Find Todo"
        })
    }

    res.status(200).json(todo)
}

// get todobycategor
const getTodoByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const todosByCategory = await Todolist.find({
                category: categoryId
            }).populate('user')
            .populate('category').
        exec();
        res.json(todosByCategory);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create new Todo
const createTodo = async (req, res) => {
    const {
        title,
        category
    } = req.body

    const loginsession = res.locals.loginSession.user

    try {
        const todolist = await Todolist.create({
            title: title,
            category: category,
            user: loginsession,
        })

        res.status(201).json({
            todolist,
            message: "Added New Todo"
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// updateStatusTodo
const updateStatusTodo = async (req, res) => {
    const {
        id
    } = req.params
    const {
        status
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Cant Find Todo"
        })
    }

    const todo = await Todolist.findOneAndUpdate({
        _id: id
    }, {
        status
    })

    if (!todo) {
        return res.status(400).json({
            error: "Cant Delete Todo With That Id"
        })
    }

    res.status(200).json(todo)

}

// delete todo
const deleteTodo = async (req, res) => {
    const {
        id
    } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Cant Find Todo"
        })
    }

    const todo = await Todolist.findOneAndDelete({
        _id: id
    })
    if (!todo) {
        return res.status(400).json({
            error: "Cant Delete Todo With That Id"
        })
    }

    res.status(200).json(todo)
}

// update todo
const updateTodo = async (req, res) => {
    const {
        id
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Cant Find Todo"
        })
    }

    const todo = await Todolist.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    })

    if (!todo) {
        return res.status(400).json({
            error: "Cant Update"
        })
    }

    res.status(200).json(todo)

}

module.exports = {
    getTodo,
    getTodoById,
    getTodoByCategory,
    createTodo,
    deleteTodo,
    updateTodo,
    updateStatusTodo
}