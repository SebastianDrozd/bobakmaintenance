
import Sidebar from "@/ui/Sidebar";
import styles from "../../styles/DashboardLayout.module.css";
import Navbar from "@/ui/Navbar";
import AuthProvider from "@/util/AuthProvider";
import QueryProvider from "@/util/QueryProvider";

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <QueryProvider>
            <div className={styles.container}>
              <Navbar />
              <Sidebar />
              {children}
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
