'use client'

import { getUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter()

    useEffect(() => {
        console.log('use effect called')
        const user = getUser().then((data) => console.log("This is data",data));
        console.log("Tis is user", user);
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;