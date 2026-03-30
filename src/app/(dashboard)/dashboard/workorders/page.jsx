"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  SortAsc,
  SortDesc,
  User,
  UserCheck2,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWorkOrders, getWorkOrdersQuery } from "@/api/workorders";
import styles from "../../../../styles/WorkOrdersPage.module.css";
import { useState } from "react";

const WorkOrdersPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState(null)
  const [sortBy, setSortBy] = useState("Date");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const { data: workOrders = [], isLoading, isError } = useQuery({
    queryKey: ["workorders", sortBy, sortDirection, searchTerm, status, priority],
    queryFn: () => getWorkOrdersQuery(sortBy, sortDirection, searchTerm, status, priority),

  },
  );

  const handleSort = (sortBy) => {
    console.log("header clicked")
    console.log("current direction", sortDirection)
    setSortBy(sortBy)
    setSortDirection(sortDirection == "DESC" ? "ASC" : "DESC")
  }
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleReset = () => {
    setSearchTerm("")
    setStatus("")
    setPriority("")
  }


  if (isError) {
    return <div className={styles.stateMessage}>Unable to load work orders.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div>

            <h1 className={styles.title}>Work Orders</h1>
            <p className={styles.subtitle}>
              Search, review, and manage all maintenance work orders from one place.
            </p>
          </div>


        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Orders</p>
            <h3 className={styles.statValue}>{workOrders.length}</h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Open</p>
            <h3 className={styles.statValue}>
              {workOrders.filter((x) => x.Status === "Open").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Urgent</p>
            <h3 className={styles.statValue}>
              {workOrders.filter((x) => x.Priority === "Urgent").length}
            </h3>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Assigned</p>
            <h3 className={styles.statValue}>
              {
                workOrders.filter(
                  (x) => x.FirstName || x.LastName
                ).length
              }
            </h3>
          </div>
        </div>

        <div className={styles.controlsCard}>
          <div className={styles.controlsTopRow}>
            <div className={styles.searchInputWrap}>
              <Search size={16} />
              <input
                placeholder="Search by description, requestor, asset, or status"
                className={styles.inputField}
                onChange={handleSearchTerm}
                value={searchTerm}
              />
            </div>

            <div className={styles.actionsRow}>
              <button className={styles.secondaryBtn}>
                <User size={16} />
                Mechanic
              </button>
              <div className={styles.selectWrap}>
                <Filter size={16} className={styles.selectIcon} />

                <select
                  className={styles.statusBtn}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="Open">Open</option>
                  <option value="Completed">Complete</option>
                </select>
              </div>
              <div className={styles.selectWrap}>
                <SlidersHorizontal size={16} className={styles.selectIcon} />

                <select
                  className={styles.statusBtn}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="" disabled>
                    Priority
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>


              <button className={styles.secondaryBtn}>
                <SortDesc size={16} />
                Last Modified
              </button>

              <button onClick={handleReset} className={styles.iconBtn}>
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>
        {isLoading ? "" : <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div>
              <h3 className={styles.tableTitle}>All Work Orders</h3>
              <p className={styles.tableSubtitle}>
                Full maintenance queue with filters, sorting, and pagination.
              </p>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.woTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th onClick={() => handleSort("Priority")}>Priority </th>
                  <th onClick={() => handleSort("Type")}>Type</th>
                  <th onClick={() => handleSort("Date")}>Date</th>
                  <th onClick={() => handleSort("Requester")}>Requestor</th>
                  <th onClick={() => handleSort("Description")}>Description</th>
                  <th onClick={() => handleSort("Status")}>Status</th>
                  <th onClick={() => handleSort("Mechanic")}>Assigned To</th>
                  <th onClick={() => handleSort("Asset")}>Asset</th>
                </tr>
              </thead>

              <tbody>
                {workOrders.map((item, index) => (
                  <tr
                    key={index}
                    className={styles.tableRow}
                    onClick={() => router.push(`/dashboard/workorder/${item.Id}`)}
                  >
                    <td className={styles.cell}>
                      <span
                        className={`${styles.badge} ${item.Priority === "Urgent"
                          ? styles.urgentBadge
                          : item.Priority === "High"
                            ? styles.highBadge
                            : item.Priority === "Medium"
                              ? styles.mediumBadge
                              : styles.lowBadge
                          }`}
                      >
                        {item.Priority}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.typePill}>
                        <Wrench size={14} />
                        {item.Type}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      {new Date(item.Date).toDateString()}
                    </td>

                    <td className={styles.cell}>
                      <div className={styles.inlineUser}>
                        <div className={styles.userIcon}>
                          <User size={14} />
                        </div>
                        <span>{item.Requestor}</span>
                      </div>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.descriptionText}>
                        {item.Description}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={`${styles.badge} ${styles.openBadge}`}>
                        {item.Status}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <div className={styles.inlineUser}>
                        <div className={styles.userIcon}>
                          <UserCheck2 size={14} />
                        </div>
                        <span>
                          {item.FirstName} {item.LastName}
                        </span>
                      </div>
                    </td>

                    <td className={styles.cell}>
                      {item.comp_desc?.toLowerCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationBar}>
            <div className={styles.paginationInfo}>
              Showing <strong>1–20</strong> of <strong>{workOrders.length}</strong> work
              orders
            </div>

            <div className={styles.paginationControls}>
              <button className={styles.pageBtn}>
                <ChevronLeft size={16} />
                Previous
              </button>

              <button className={`${styles.pageNumber} ${styles.pageNumberActive}`}>
                1
              </button>
              <button className={styles.pageNumber}>2</button>
              <button className={styles.pageNumber}>3</button>
              <button className={styles.pageNumber}>4</button>

              <button className={styles.pageBtn}>
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>}

      </div>
    </div>
  );
};

export default WorkOrdersPage;