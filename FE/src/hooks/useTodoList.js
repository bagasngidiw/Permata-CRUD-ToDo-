import {
    useEffect,
    useState
} from "react"
import {
    API
} from "../libs/api"

export function useTodoList() {

    const [todo, setTodo] = useState([])

    const fetchData = async () => {
        try {
            const response = await API.get('/todolist', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setTodo(response.data)
            return response.data;

        } catch (error) {

        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchDataByCategory = async (categoryId) => {
        try {
            const response = await API.get(`/todolist/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching todos by category:", error);
        }
    }

    const createTodolist = async (title,categoryId) => {
        try {
            const response = await API.post('/todolist', {
                title: title,
                category: categoryId

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            window.location.href ='/home'
            fetchData()
        } catch (error) {
            console.error("Error creating todo:", error);

        }
    }
    const updateTodolist = async (todoId, title, catId) => {
        try {
            const response = await API.patch(`/todolist/${todoId}`, {
                title: title,
                category: catId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            window.location.href ='/posts'
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTodolist = async (todoId) => {
        try {
            const response = await API.delete(`/todolist/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            window.location.href ='/home'
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }


    return {
        todo,
        setTodo,
        fetchData,
        fetchDataByCategory,
        createTodolist,
        updateTodolist,
        deleteTodolist
    }

}