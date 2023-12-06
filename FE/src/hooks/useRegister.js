import {
    useState
} from 'react'
import {
    useNavigate
} from 'react-router-dom'
import {
    API
} from "../libs/api";


export function useRegister() {
    const Navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;
        console.log(name);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleRegister() {
        try {
            const response = await API.post('/user/register', formData)
            console.log("Register Success", response.data)
            Navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    const signUp = async () => {
        setIsLoading(true);
        await handleRegister();
        setIsLoading(false);
    };

    return {
        handleChange,
        isLoading,
        signUp
    }
}