'use client'

import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import styles from "../styles/ui/Navbar.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/util/AuthProvider";
import { logoutUser } from "@/api/auth";

const Navbar = () => {
    const router = useRouter();
    const path = usePathname();
    const pathNames = path.split('/').filter(path => path);
    const auth = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            // adjust this endpoint if yours is different
           await logoutUser();

            setMenuOpen(false);


            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}></div>

            <div className={styles.right}>
                <button className={styles.iconBtn}>
                    <Bell size={18} />
                    <span className={styles.notificationDot}></span>
                </button>

                <div className={styles.userMenuWrapper} ref={dropdownRef}>
                    <button
                        className={styles.userTrigger}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        type="button"
                    >
                        <div className={styles.userAvatar}>
                            <User size={16} />
                        </div>

                        <span className={styles.userName}>
                            {auth?.user?.username || "User"}
                        </span>

                        <ChevronDown
                            size={16}
                            className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ""}`}
                        />
                    </button>

                    {menuOpen && (
                        <div className={styles.dropdown}>
                            <button
                                className={styles.dropdownItem}
                                onClick={handleLogout}
                                type="button"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;