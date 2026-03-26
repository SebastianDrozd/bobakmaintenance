'use client'

import styles from '../styles/components/LoadingSpinnerLogin.module.css'

const LoadingSpinnerLogin = ({ text = "" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default LoadingSpinnerLogin