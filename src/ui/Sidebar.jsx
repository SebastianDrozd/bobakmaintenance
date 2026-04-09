'use client'
import {
  ChartAreaIcon,
  ClipboardList,
  Factory,
  File,
  House,
  ReceiptPoundSterling,
  Wrench,
} from "lucide-react";
import styles from "../styles/ui/Sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/util/AuthProvider";


const Sidebar = () => {
  const router = useRouter();
  const path = usePathname()
  console.log("this is path",path)
  const auth = useContext(AuthContext)
  const isAdmin = auth?.user?.role === "Admin";
  return (
    <aside className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.logoBox}>
          <Wrench size={18} />
        </div>
        <div>
          <p className={styles.eyebrow}>Bobak</p>
          <h2 className={styles.title}>Maintenance</h2>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={styles.sectionLabel}>Navigation</p>

        <ul className={styles.list}>
          <li onClick={() => router.push("/dashboard")}  className={`${styles.listItem} ${path ==("/dashboard") && styles.active}`}>
            <House size={18} />
            <span>Home</span>
          </li>
          <li onClick={() => router.push("/dashboard/workorders")}  className={`${styles.listItem} ${path.includes("workorders") && styles.active }`}>
            <File size={18} />
            <span>Work Orders</span>
          </li>
          {isAdmin && 
            <li onClick={() => router.push("/dashboard/preventativemaintenance")}  className={`${styles.listItem} ${path ==("/dashboard/preventativemaintenance") && styles.active}`}>
              <ChartAreaIcon size={18} />
              <span>Preventative Maintenance</span>
            </li>}
        {isAdmin && (
          <li onClick={() => router.push("/dashboard/assets")} className={`${styles.listItem} ${path ==("/dashboard/assets") && styles.active}`}>
            <Factory size={18} />
            <span>Assets</span>
          </li>
        )}
          

          
          <li onClick={() => router.push("/dashboard/logs")} className={`${styles.listItem} ${path ==("/dashboard/logs") && styles.active}`}>
          
            <ClipboardList size={18} />
            <span>Logs</span>
          </li>
          <li onClick={() => router.push("/dashboard/admin")}  className={`${styles.listItem} ${path ==("/dashboard/admin") && styles.active}`}>
            <ReceiptPoundSterling size={18} />
            <span>Admin</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;