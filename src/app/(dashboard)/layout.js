import Sidebar from "@/ui/Sidebar";
import styles from "../../styles/DashboardLayout.module.css";
import Navbar from "@/ui/Navbar";
import AuthProvider from "@/util/AuthProvider";

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <div className={styles.container}>
            <Navbar />
            <Sidebar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
