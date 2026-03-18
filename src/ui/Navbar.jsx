'use client'
import { useRouter } from "next/navigation";
import styles from "../styles/ui/Navbar.module.css"

const Navbar = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h4>Dashboard</h4>
            <button onClick={() => {
                router.push("/dashboard/create")
            }} className={styles.newBtn}>Create New</button>
        </div>
    )
}

export default Navbar;