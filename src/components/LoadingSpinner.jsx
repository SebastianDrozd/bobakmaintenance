'use client'

import styles from '../styles/components/LoadingSpinner.module.css'

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default LoadingSpinner