"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Search,
  Plus,
  Wrench,
  Shield,
  Pencil,
  X,
} from "lucide-react";
import styles from "../../../../styles/AdminPage.module.css";

const mockMechanics = [
  {
    id: 1,
    firstName: "Uriel ",
    lastName: "PerezPerez",
    username: "perez",
    role: "Mechanic",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Jonathon Perez",
    lastName: "Perez",
    username: "uperez",
    role: "Mechanic",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Mariusz",
    lastName: "Czyrek",
    username: "mrczyrek",
    role: "Supervisor",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Pawel",
    lastName: "Staroskta",
    username: "",
    role: "Mechanic",
    status: "Inactive",
  },
];

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Settings size={22} />
            </div>

            <div>
              <p className={styles.eyebrow}>Administration</p>
              <h1 className={styles.title}>Admin Panel</h1>
              <p className={styles.subtitle}>
                Manage system settings and core maintenance users. Additional
                administrative tools can be added here over time.
              </p>
            </div>
          </div>

          <button
            className={styles.primaryBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Add Mechanic
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Mechanics</p>
            <h3 className={styles.statValue}>{mockMechanics.length}</h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Active</p>
            <h3 className={styles.statValue}>
              {mockMechanics.filter((x) => x.status === "Active").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Inactive</p>
            <h3 className={styles.statValue}>
              {mockMechanics.filter((x) => x.status === "Inactive").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Supervisors</p>
            <h3 className={styles.statValue}>
              {mockMechanics.filter((x) => x.role === "Supervisor").length}
            </h3>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Mechanics</h2>
              <p className={styles.sectionText}>
                Add and maintain the list of mechanics available in the system.
              </p>
            </div>
          </div>

          <div className={styles.controlsRow}>
            <div className={styles.searchInputWrap}>
              <Search size={16} />
              <input
                className={styles.inputField}
                placeholder="Search by name, username, or role"
              />
            </div>

            <button
              className={styles.secondaryBtn}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} />
              New Mechanic
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {mockMechanics.map((mechanic) => (
                  <tr key={mechanic.id} className={styles.tableRow}>
                    <td className={styles.cell}>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>
                          <User size={15} />
                        </div>
                        <span>
                          {mechanic.firstName} {mechanic.lastName}
                        </span>
                      </div>
                    </td>

                    <td className={styles.cell}>{mechanic.username}</td>

                    <td className={styles.cell}>
                      <span className={styles.rolePill}>
                        <Wrench size={14} />
                        {mechanic.role}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span
                        className={`${styles.badge} ${
                          mechanic.status === "Active"
                            ? styles.activeBadge
                            : styles.inactiveBadge
                        }`}
                      >
                        {mechanic.status}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <button className={styles.iconActionBtn}>
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.footerNote}>
            <div className={styles.footerIcon}>
              <Shield size={16} />
            </div>
            <p className={styles.footerText}>
              More administrative tools can be added here later, such as roles,
              permissions, departments, and asset configuration settings.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && <CreateMechanicModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const CreateMechanicModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Administration</p>
            <h2 className={styles.modalTitle}>Add Mechanic</h2>
            <p className={styles.modalSubtitle}>
              Create a new mechanic record for assignment and tracking.
            </p>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <input className={styles.modalInput} placeholder="Mike" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <input className={styles.modalInput} placeholder="Johnson" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <input className={styles.modalInput} placeholder="mjohnson" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <select className={styles.modalInput}>
                <option value="">Select role</option>
                <option>Mechanic</option>
                <option>Supervisor</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select className={styles.modalInput}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes</label>
              <textarea
                className={styles.textarea}
                placeholder="Optional notes about the mechanic, role, or assignment responsibilities"
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.modalFooterText}>
              Additional admin features can be added to this page later.
            </div>

            <div className={styles.buttonRow}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Save Mechanic
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;