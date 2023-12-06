import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../libs/setAuthToken"

export default function useLogout(){
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        setAuthToken(null)
        navigate('/login')
    }

    return {logout}
}