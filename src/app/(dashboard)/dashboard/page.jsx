'use client'
import { AuthContext } from "@/util/AuthProvider";
import { useContext } from "react";
import styles from "../../../styles/DashboardPage.module.css"
import DashboardCards from "@/components/DashboardCards";
import WorkOrderTable from "@/components/WorkOrderTable";
import WorkOrdersChart from "@/components/WorkOrderChart";
import DashboardChartsRow from "@/components/DashboardChartsRow";
const Dashboard = () => {
    //const auth = useContext(AuthContext)
    //const user = auth.user;
   // console.log("this is user",user)
    return (
        <div className={styles.container}>
            <DashboardCards/>
            <WorkOrdersChart/>
              <DashboardChartsRow/>
            <WorkOrderTable/>
        </div>
    )
}

export default Dashboard;