'use client'
import { Search, SortDesc, User, UserCheck2, Wrench } from "lucide-react";
import styles from "../styles/components/WorkOrdersTable.module.css";
import { useQuery } from "@tanstack/react-query";
import { getWorkOrders } from "@/api/workorders";
import { useRouter } from "next/navigation";


const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const WorkOrderTable = () => {
  const router = useRouter()
  const {data : workOrders,isLoading,isError} = useQuery({
    queryKey : ['workorders'],
    queryFn : getWorkOrders
  })

  console.log("this is data",workOrders)

  if(isLoading)
    return <p>loading.....</p>
  return (
    <div className={styles.container}>
      

      <div className={styles.tableCard}>
        <div className={styles.tableHeaderBar}>
          <div>
            <h3 className={styles.tableTitle}>Current Queue</h3>
            <p className={styles.tableSubtitle}>
              Showing all urgent and recently created work orders.
            </p>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.woTable}>
            <thead>
              <tr className={styles.tableHeaders}>
                <th>Priority</th>
                <th>Type</th>
                <th>Date</th>
                <th>Requestor</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Asset</th>
              </tr>
            </thead>

            <tbody>
              {workOrders.map((item,index) => (
                <tr key={index} className={styles.tableRow} onClick={() => {router.push(`/dashboard/workorder/${item.Id}`)}}>
                  <td className={styles.cell}>
                    <span className={`${styles.badge} ${item.Priority =="Urgent" && styles.urgentBadge}  ${item.Priority =="High" && styles.highBadge} ${item.Priority =="Medium" && styles.mediumBadge} ${item.Priority =="Low" && styles.lowBadge}`}>
                      {item.Priority}
                    </span>
                  </td>

                  <td className={styles.cell}>
                    <span className={styles.typePill}>
                      <Wrench size={14} />
                      {item.Type}
                    </span>
                  </td>

                  <td className={styles.cell}>{ new Date(item.Date).toDateString()}</td>

                  <td className={styles.cell}>
                    <div className={styles.inlineUser}>
                      <div className={styles.userIcon}>
                        <User size={14} />
                      </div>
                      <span>{item.Requestor}</span>
                    </div>
                  </td>

                  <td className={styles.cell}>
                    <span className={styles.descriptionText}>
                     {item.Description}
                    </span>
                  </td>

                  <td className={styles.cell}>
                    <span className={`${styles.badge} ${styles.openBadge}`}>
                      {item.Status}
                    </span>
                  </td>

                  <td className={styles.cell}>
                    <div className={styles.inlineUser}>
                      <div className={styles.userIcon}>
                        <UserCheck2 size={14} />
                      </div>
                      <span>{item.FirstName} {item.LastName}</span>
                    </div>
                  </td>

                  <td className={styles.cell}>{item.comp_desc?.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderTable;