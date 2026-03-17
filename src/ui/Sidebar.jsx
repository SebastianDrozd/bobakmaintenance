import { ChartAreaIcon, Factory, House } from "lucide-react";
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
          <li className={styles.listItem}> Statistics</li>
          <li className={styles.listItem}>Reports</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
