import { SortDesc, User, UserCheck2 } from "lucide-react";
import styles from "../styles/components/WorkOrdersTable.module.css";
const data = [1, 2, 3, 4, 5, 6, 7, 8,9,10];
const WorkOrderTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        <input placeholder="Search for items" className={styles.inputField} />
        <div className={styles.btnRow}>
          <button className={styles.btn}>
            <User size={16} />
            Mechanic
          </button>
          <button className={styles.btn}>
            <SortDesc size={16} />
            Last Modified
          </button>
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
            {data.map((data) => (
              <tr key={data} className={styles.tableRow}>
                <td className={styles.cell}>Urgent</td>
                <td className={styles.cell}>Regular</td>
                <td className={styles.cell}>Sunday July 1st 2025</td>
                <td className={styles.cell}><User/>Sebastian</td>
                <td className={styles.cell}>
                  Fix leaking valve in blast chill cooler
                </td>
                <td className={styles.cell}>Open</td>
                <td className={styles.cell}>Uperez</td>
                <td className={styles.cell}>Blast Chill</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkOrderTable;
