'use client'

import { usePathname, useRouter } from "next/navigation";
import { Bell, Plus, User } from "lucide-react";
import styles from "../styles/ui/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "@/util/AuthProvider";

const Navbar = () => {
    const router = useRouter();
    const path = usePathname();
    const pathNames = path.split('/').filter( path => path )
    const auth = useContext(AuthContext)
    console.log("this is auth",auth)
    return (
        <div className={styles.container}>
            <div className={styles.left}>
               
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
                    <span className={styles.userName}>{auth?.user?.username}</span>
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