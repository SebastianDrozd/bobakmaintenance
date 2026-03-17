'use client'
import { loginUser } from "@/api/auth";
import { AuthContext } from "@/util/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"

const LoginPage = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const auth = useContext(AuthContext);
    const router = useRouter();
    const handleLogin = () => {
        const login = {
            username,
            password
        }
        loginUser(login)
    }

return (
    <div>
        <input value={username}  placeholder="username" onChange={e => setUsername(e.target.value)}/>
        <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin }>Login</button>
    </div>
)
}

export default LoginPage