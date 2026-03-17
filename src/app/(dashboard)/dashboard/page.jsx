'use client'
import { AuthContext } from "@/util/AuthProvider";
import { useContext } from "react";
import styles from "../../../styles/DashboardPage.module.css"
import DashboardCards from "@/components/DashboardCards";
import WorkOrderTable from "@/components/WorkOrderTable";
const Dashboard = () => {
    //const auth = useContext(AuthContext)
    //const user = auth.user;
   // console.log("this is user",user)
    return (
        <div className={styles.container}>
            <DashboardCards/>
            <WorkOrderTable/>
        </div>
    )
}

export default Dashboard;