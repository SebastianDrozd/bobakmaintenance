'use client'
import { ClipboardList, CalendarDays, User, Wrench, AlertCircle } from "lucide-react";
import styles from "../../../../styles/CreateWorkOrderPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "@/api/assets";
import { useState } from "react";

const CreateWorkerOrderPage = () => {
    const [wantsAssets,setWantsAssets] = useState(false)
    const {data : assets,isLoading,isError} = useQuery({
        queryKey: ['assets'],
        queryFn: getAssets,
        enabled: !!wantsAssets
    })
    console.log("this is data",assets)
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerIcon}>
            <ClipboardList size={22} />
          </div>
          <div>
      
            <h1 className={styles.title}>Create Work Order</h1>
            <p className={styles.subtitle}>
              Add a new task, assign ownership, and set the urgency level.
            </p>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Work Order Details</h2>
            <p className={styles.sectionText}>
              Fill out the information below to create a new maintenance request.
            </p>
          </div>

          <form className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                <Wrench size={16} />
                Asset
              </label>
              <select onClick={() => setWantsAssets(true)} className={styles.inputField}>
                <option value="">Select an asset</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <User size={16} />
                Assign To
              </label>
              <select className={styles.inputField}>
                <option value="">Select a mechanic</option>
              </select>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <ClipboardList size={16} />
                Task Description
              </label>
              <textarea
                className={`${styles.inputField} ${styles.textareaField}`}
                placeholder="Describe the issue, requested work, or maintenance task..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <AlertCircle size={16} />
                Priority
              </label>
              <select className={styles.inputField}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <CalendarDays size={16} />
                Due Date
              </label>
              <input type="date" className={styles.inputField} />
            </div>
          </form>

          <div className={styles.footer}>
            <div className={styles.helperText}>
              Make sure the task description is clear enough for the assigned mechanic.
            </div>
            <div className={styles.buttonRow}>
              <button type="button" className={styles.secondaryBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.primaryBtn}>
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkerOrderPage;