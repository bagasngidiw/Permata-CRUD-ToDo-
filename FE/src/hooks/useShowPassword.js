import { useState } from "react";

export default function(){
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return {showPassword, togglePasswordVisibility}
}