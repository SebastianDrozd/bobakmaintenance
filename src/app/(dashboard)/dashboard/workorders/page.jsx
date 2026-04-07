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
import { useEffect, useState } from "react";

const WorkOrdersPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState(null)
  const [sortBy, setSortBy] = useState("Date");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [type, setType] = useState("")
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageButtons, setPageButtons] = useState([])
  const { data: workOrders = [], isLoading, isError } = useQuery({
    queryKey: ["workorders", sortBy, sortDirection, searchTerm, status, priority, type, page, pageSize],
    queryFn: () => getWorkOrdersQuery(page, pageSize, sortBy, sortDirection, searchTerm, status, priority, type),
  },
  );
  console.log(workOrders)
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
    setType("")
  }
  useEffect(() => {
    if(workOrders?.totalPages) {
    const buttons = [];
    for(let i = page; i < page + 3 && i <= workOrders.totalPages; i++) {
      buttons.push(i);
    }
    setPageButtons(buttons);
   }
  }, [workOrders])
 
  if (isError) {
    return <div className={styles.stateMessage}>Unable to load work orders.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Work Orders</h1>
              <p className={styles.subtitle}>
                Search, review, and manage all maintenance work orders from one place.
              </p>
            </div>

            <button onClick={() => router.push("/dashboard/create")} className={styles.newBtn}>
              <Plus size={16} />
              Create New
            </button>
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
              <div className={styles.selectWrap}>

                <SortDesc size={16} className={styles.selectIcon} />
                <select
                  className={styles.statusBtn}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="Regular">Regular</option>
                  <option value="PM">Pm</option>
                </select>
              </div>
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
            <select
              value={pageSize}
              className={styles.select}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
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
                {workOrders.items.map((item, index) => (
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
              Showing{" "}
              <strong>
                {workOrders?.items?.length > 0 ? (page - 1) * pageSize + 1 : 0}–
                {Math.min(page * pageSize, workOrders?.totalCount)}
              </strong>{" "}
              of <strong>{workOrders?.totalCount}</strong> work orders
            </div>

            <div className={styles.paginationControls}>
              {workOrders?.hasPreviousPage &&
                <button className={styles.pageBtn} onClick={() => setPage(page - 1)}>
                  <ChevronLeft size={16} />
                  Previous
                </button>}


               {pageButtons.map((btnPage) => (
                <button
                  key={btnPage}
                  onClick={() => setPage(btnPage)}
                  className={`${styles.pageNumber} ${page === btnPage ? styles.pageNumberActive : ""}`}
                >
                  {btnPage}
                </button>
              ))}

              {workOrders?.hasNextPage &&
                <button className={styles.pageBtn} onClick={() => setPage(page + 1)}>
                  Next
                  <ChevronRight size={16} />
                </button>
              }

            </div>
          </div>
        </div>}

      </div>
    </div>
  );
};

export default WorkOrdersPage;