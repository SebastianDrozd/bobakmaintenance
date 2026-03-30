"use client";

import { useState } from "react";
import {
  Factory,
  Plus,
  Search,
  SlidersHorizontal,
  Filter,
  Wrench,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";
import styles from "../../../../styles/AssetsPage.module.css";

const mockAssets = [
  {
    id: 1,
    assetCode: "AST-1001",
    name: "Blast Chill Cooler",
    department: "Packaging",
    type: "Cooling",
    status: "Active",
    lastService: "2026-03-10",
    owner: "Uperez",
  },
  {
    id: 2,
    assetCode: "AST-1002",
    name: "Mixer Line 2",
    department: "Processing",
    type: "Mixer",
    status: "Active",
    lastService: "2026-03-05",
    owner: "Mjohnson",
  },
  {
    id: 3,
    assetCode: "AST-1003",
    name: "Smokehouse Oven 1",
    department: "Cooking",
    type: "Oven",
    status: "Maintenance",
    lastService: "2026-02-28",
    owner: "Rgarcia",
  },
  {
    id: 4,
    assetCode: "AST-1004",
    name: "Vacuum Sealer",
    department: "Packaging",
    type: "Sealer",
    status: "Inactive",
    lastService: "2026-01-17",
    owner: "None",
  },
];

const AssetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div>
            <p className={styles.eyebrow}>Maintenance</p>
            <h1 className={styles.title}>Assets</h1>
            <p className={styles.subtitle}>
              View, search, and manage plant assets used across maintenance operations.
            </p>
          </div>

          <button
            className={styles.primaryBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            New Asset
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Assets</p>
            <h3 className={styles.statValue}>{mockAssets.length}</h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Active</p>
            <h3 className={styles.statValue}>
              {mockAssets.filter((x) => x.status === "Active").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>In Maintenance</p>
            <h3 className={styles.statValue}>
              {mockAssets.filter((x) => x.status === "Maintenance").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Inactive</p>
            <h3 className={styles.statValue}>
              {mockAssets.filter((x) => x.status === "Inactive").length}
            </h3>
          </div>
        </div>

        <div className={styles.controlsCard}>
          <div className={styles.controlsTopRow}>
            <div className={styles.searchInputWrap}>
              <Search size={16} />
              <input
                className={styles.inputField}
                placeholder="Search by asset name, code, department, or type"
              />
            </div>

            <div className={styles.actionsRow}>
              <button className={styles.secondaryBtn}>
                <Filter size={16} />
                Department
              </button>

              <button className={styles.secondaryBtn}>
                <SlidersHorizontal size={16} />
                Status
              </button>

              <button className={styles.secondaryBtn}>
                <Wrench size={16} />
                Type
              </button>
            </div>
          </div>

          <div className={styles.quickFilters}>
            <button className={styles.filterPillActive}>All</button>
            <button className={styles.filterPill}>Active</button>
            <button className={styles.filterPill}>Maintenance</button>
            <button className={styles.filterPill}>Inactive</button>
            <button className={styles.filterPill}>Packaging</button>
            <button className={styles.filterPill}>Processing</button>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div>
              <h3 className={styles.tableTitle}>Asset Registry</h3>
              <p className={styles.tableSubtitle}>
                Master list of tracked maintenance assets.
              </p>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.assetsTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th>Asset</th>
                  <th>Asset Code</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Service</th>
                  <th>Owner</th>
                </tr>
              </thead>

              <tbody>
                {mockAssets.map((asset) => (
                  <tr key={asset.id} className={styles.tableRow}>
                    <td className={styles.cell}>
                      <div className={styles.assetNameWrap}>
                        <div className={styles.assetIcon}>
                          <Factory size={15} />
                        </div>
                        <span>{asset.name}</span>
                      </div>
                    </td>

                    <td className={styles.cell}>{asset.assetCode}</td>

                    <td className={styles.cell}>
                      <span className={styles.inlineMeta}>
                        <MapPin size={14} />
                        {asset.department}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.typePill}>{asset.type}</span>
                    </td>

                    <td className={styles.cell}>
                      <span
                        className={`${styles.badge} ${
                          asset.status === "Active"
                            ? styles.activeBadge
                            : asset.status === "Maintenance"
                            ? styles.maintenanceBadge
                            : styles.inactiveBadge
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    <td className={styles.cell}>{asset.lastService}</td>

                    <td className={styles.cell}>
                      <span className={styles.inlineMeta}>
                        <ShieldCheck size={14} />
                        {asset.owner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationBar}>
            <div className={styles.paginationInfo}>
              Showing <strong>1–4</strong> of <strong>{mockAssets.length}</strong> assets
            </div>

            <div className={styles.paginationControls}>
              <button className={styles.pageBtn}>Previous</button>
              <button className={`${styles.pageNumber} ${styles.pageNumberActive}`}>
                1
              </button>
              <button className={styles.pageBtn}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <CreateAssetModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const CreateAssetModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Assets</p>
            <h2 className={styles.modalTitle}>Create New Asset</h2>
            <p className={styles.modalSubtitle}>
              Add a new asset to the maintenance registry.
            </p>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Asset Name</label>
              <input className={styles.modalInput} placeholder="Blast Chill Cooler" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Asset Code</label>
              <input className={styles.modalInput} placeholder="AST-1005" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Department</label>
              <select className={styles.modalInput}>
                <option value="">Select department</option>
                <option>Packaging</option>
                <option>Processing</option>
                <option>Cooking</option>
                <option>Grinding</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Type</label>
              <select className={styles.modalInput}>
                <option value="">Select type</option>
                <option>Mixer</option>
                <option>Cooling</option>
                <option>Oven</option>
                <option>Sealer</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select className={styles.modalInput}>
                <option>Active</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Last Service Date</label>
              <input type="date" className={styles.modalInput} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                placeholder="Add notes about the asset, location, or maintenance considerations"
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.footerText}>
              Asset details can be edited later after creation.
            </div>

            <div className={styles.buttonRow}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Create Asset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetsPage;