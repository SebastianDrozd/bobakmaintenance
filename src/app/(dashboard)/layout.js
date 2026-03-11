import Sidebar from '@/ui/Sidebar';
import styles from '../../styles/DashboardLayout.module.css'
import Navbar from '@/ui/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <div className={styles.container}>
          <Navbar/>
          <Sidebar/>
        {children}
        </div>
      </body>
    </html>
  );
}
