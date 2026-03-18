import { ChartAreaIcon, Factory, File, House, ReceiptPoundSterling } from "lucide-react";
import styles from "../styles/ui/Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Maintenance</h2>
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.list}>
          <li className={styles.listItem}><House/>   Home</li>
          <li className={styles.listItem}><ChartAreaIcon/>  Preventative Maintenance</li>
          <li className={styles.listItem}><Factory/> Assets</li>
          <li className={styles.listItem}><File/> Statistics</li>
          <li className={styles.listItem}><ReceiptPoundSterling/>Reports</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
