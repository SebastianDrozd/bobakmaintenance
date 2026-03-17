import styles from "../styles/ui/Navbar.module.css"
const Navbar = () => {
    return (
        <div className={styles.container}>
            <h4>Dashboard</h4>
            <button className={styles.newBtn}>Create New</button>
        </div>
    )
}

export default Navbar;