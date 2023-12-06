import {
    useEffect,
    useState
} from "react";
import {
    API
} from "../libs/api";

export function useCategory() {
    const [category, setCategory] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [categoryById, setCategoryById] = useState()
    const initialCategory = {
        title: '',
        color: '#000000', 
    };
    const [newCategory, setNewCategory] = useState({ ...initialCategory });
    
    

    const handleTitleChange = (event) => {
        setNewCategory({
            ...newCategory,
            title: event.target.value
        });
    };

    const handleColorChange = (event) => {
        setNewCategory({
            ...newCategory,
            color: event.target.value
        });
    };


    const fetchData = async () => {

        try {
            const response = await API.get('/category', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setCategory(response.data)

        } catch (error) {
            console.log(error, "error fetch category")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const fetchById = async (categoryId) => {
        try {
            const response = await API.get(`/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setCategoryById(response.data)
            return response.data;

        } catch (error) {
            console.log(error, "error fetch category By id")

        }
    }

    const createCategory = async () => {
        try {
            const response = await API.post('/category', newCategory, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            });
            window.location.href ='/home'
            fetchData()
            setNewCategory({ ...initialCategory });
            setIsOpen(false);      
        } catch (error) {

        }
    }

    return {
        category,
        newCategory,
        isOpen,
        setIsOpen,
        fetchById,
        handleTitleChange,
        handleColorChange,
        createCategory

    }
}