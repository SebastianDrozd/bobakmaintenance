import {
  ChartAreaIcon,
  Factory,
  File,
  House,
  ReceiptPoundSterling,
  Wrench,
} from "lucide-react";
import styles from "../styles/ui/Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.logoBox}>
          <Wrench size={18} />
        </div>
        <div>
          <p className={styles.eyebrow}>Operations</p>
          <h2 className={styles.title}>Maintenance</h2>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={styles.sectionLabel}>Navigation</p>

        <ul className={styles.list}>
          <li className={`${styles.listItem} ${styles.active}`}>
            <House size={18} />
            <span>Home</span>
          </li>

          <li className={styles.listItem}>
            <ChartAreaIcon size={18} />
            <span>Preventative Maintenance</span>
          </li>

          <li className={styles.listItem}>
            <Factory size={18} />
            <span>Assets</span>
          </li>

          <li className={styles.listItem}>
            <File size={18} />
            <span>Statistics</span>
          </li>

          <li className={styles.listItem}>
            <ReceiptPoundSterling size={18} />
            <span>Reports</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;