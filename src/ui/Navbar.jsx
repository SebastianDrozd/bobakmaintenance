'use client'

import { useRouter } from "next/navigation";
import { Bell, Plus, User } from "lucide-react";
import styles from "../styles/ui/Navbar.module.css";

const Navbar = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h4 className={styles.title}>Dashboard</h4>
            </div>

            <div className={styles.right}>
               

                <button className={styles.iconBtn}>
                    <Bell size={18} />
                    <span className={styles.notificationDot}></span>
                </button>

                <div className={styles.user}>
                    <div className={styles.userAvatar}>
                        <User size={16} />
                    </div>
                    <span className={styles.userName}>Sebastian</span>
                </div>
                 <button
                    onClick={() => router.push("/dashboard/create")}
                    className={styles.newBtn}
                >
                    <Plus size={16} />
                    Create New
                </button>
            </div>
        </div>
    );
};

export default Navbar;