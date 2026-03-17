'use client'
import { AuthContext } from "@/util/AuthProvider";
import { useContext } from "react";

const Dashboard = () => {
    const auth = useContext(AuthContext)
    const user = auth.user;
    console.log("this is user",user)
    return (
        <div>
            Dashboard Page
        </div>
    )
}

export default Dashboard;