import {
    useState
} from 'react'
import {
    useNavigate
} from 'react-router-dom'
import {
    API
} from "../libs/api";
import {
    setAuthToken
} from '../libs/setAuthToken';

export default function useLogin() {
    const Navigate = useNavigate()

    const [formData, setFormData] = useState({
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

    async function handleLogin() {
        try {
            const response = await API.post('/user/login', formData)
            console.log("Login Success", response.data.username)
          

            const token = response.data.token
            setAuthToken(token)
            localStorage.setItem('token', token);

            Navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        setIsLoading(true);
        await handleLogin();
        setIsLoading(false);
    };

    return {
        handleChange,
        signIn,
        isLoading,
    }
}