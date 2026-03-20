import { ComputerIcon, File, ListOrdered, User2Icon } from "lucide-react";
import styles from "../styles/components/DashboardCards.module.css";
const DashboardCards = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.card1}`}>
        <div>
          <h3>Active Orders</h3>
          <p className={styles.sub}>Quisque tristique libero vitae finibus sollicitudin.</p>
        </div>
        <div className={styles.square}>
            <ListOrdered/>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card2}`}>
        <div>
          <h3>Past Due</h3>
          <p className={styles.sub}>Quisque tristique libero vitae finibus sollicitudin.</p>
        </div>
         <div className={styles.square}>
            <User2Icon/>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card3}`}>
        <div>
          <h3>New This Week</h3>
          <p className={styles.sub}>Quisque tristique libero vitae finibus sollicitudin.</p>
        </div>
        <div className={styles.square}>
            <File/>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card4}`}>
       <div >
          <h3>Sample</h3>
          <p className={styles.sub}>Quisque tristique libero vitae finibus sollicitudin.</p>
        </div>
         <div className={styles.square}>
            <ComputerIcon/>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
