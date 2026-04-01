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
  RefreshCwIcon,
} from "lucide-react";
import styles from "../../../../styles/AssetsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAssets, getAssetsQuery, getFullAssets } from "@/api/assets";

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
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('comp_desc');
  const [sortDirection, setSortDirection] = useState('asc');
  const [pageSize, setPageSize] = useState(25);
  const { data: assets } = useQuery({
    queryKey: ['assets', page, pageSize, sortBy, sortDirection],
    queryFn: () => getAssetsQuery(page, pageSize, sortBy, sortDirection),
  })

  console.log(assets)


  const handleSortByClick = (field) => {
    setSortBy(field);
    console.log("this is sort by " + field)
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }


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
                <SlidersHorizontal size={16} />
                Status
              </button>

              <button className={styles.secondaryBtn}>
                <RefreshCwIcon size={16} />
             
              </button>
            </div>
          </div>

        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div className={styles.headerRow}>
              <div>
                <h3 className={styles.tableTitle}>Asset Registry</h3>
                <p className={styles.tableSubtitle}>
                  Master list of tracked maintenance assets.
                </p>
              </div>
              <div>
                <select value={pageSize} className={styles.select} onChange={(e) => setPageSize(Number(e.target.value))}>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>


            </div>

          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.assetsTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th onClick={() => handleSortByClick("comp_desc")}>Asset</th>
                  <th onClick={() => handleSortByClick("compid")}>Asset Code</th>
                  <th onClick={() => handleSortByClick("department")}>Department</th>
                  <th onClick={() => handleSortByClick("line_no")}>Line No</th>
                  <th onClick={() => handleSortByClick("status")}>Status</th>
                  <th onClick={() => handleSortByClick("manufacturer")}>Manufacturer</th>
                  <th >Model No</th>
                </tr>
              </thead>

              <tbody>
                {assets?.items?.map((asset) => (
                  <tr key={asset.id} className={styles.tableRow}>
                    <td className={styles.cell}>
                      <div className={styles.assetNameWrap}>
                        <div className={styles.assetIcon}>
                          <Factory size={15} />
                        </div>
                        <span>{asset.comp_desc}</span>
                      </div>
                    </td>

                    <td className={styles.cell}>{asset.compid}</td>

                    <td className={styles.cell}>
                      <span className={styles.inlineMeta}>
                        <MapPin size={14} />
                        {asset.department}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.typePill}>{asset.line_no}</span>
                    </td>

                    <td className={styles.cell}>
                      <span
                        className={`${styles.badge} ${asset.status === "Active"
                          ? styles.activeBadge
                          : asset.status === "Inactive"
                            ? styles.inactiveBadge
                            : styles.maintenanceBadge
                          }`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    <td className={styles.cell}>{asset.manufacturer}</td>

                    <td className={styles.cell}>
                      <span className={styles.inlineMeta}>
                        <ShieldCheck size={14} />
                        {asset.model_no}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationBar}>
            <div className={styles.paginationInfo}>
              Showing <strong>{assets?.items?.length > 0 ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, assets?.totalCount)}</strong> of <strong>{assets?.totalCount}</strong> assets
            </div>

            <div className={styles.paginationControls}>
              {assets?.hasPreviousPage && <button onClick={() => setPage((prev) => prev - 1)} className={styles.pageBtn}>Previous</button>}

              {assets?.hasNextPage && <button onClick={() => setPage((prev) => prev + 1)} className={styles.pageBtn}>Next</button>}
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