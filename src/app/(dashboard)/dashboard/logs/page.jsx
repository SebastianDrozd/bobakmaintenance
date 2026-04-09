"use client";

import {
    ClipboardList,
    Factory,
    Filter,
    Pencil,
    Plus,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    User,
    Wrench,
    CheckCircle2,
    Clock3,
    FilterIcon,
    RefreshCwIcon,
} from "lucide-react";
import styles from "../../../../styles/LogsPage.module.css";
import { getLogsQuery } from "@/api/logs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const getTypeIcon = (type) => {
    switch (type) {
        case "work_order":
            return <ClipboardList size={15} />;
        case "pm_template":
            return <ShieldCheck size={15} />;
        case "asset":
            return <Factory size={15} />;
        case "admin":
            return <User size={15} />;
        default:
            return <Clock3 size={15} />;
    }
};

const LogsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [type, setType] = useState("");
    const [action, setAction] = useState("");
    const [pageButtons, setPageButtons] = useState([]);
    const { data: logs, isLoading, isError } = useQuery({
        queryKey: ['logs', page, pageSize, searchTerm, type, action],
        queryFn: () => getLogsQuery(page, pageSize, searchTerm, type, action)
    })
    const router = useRouter();


    const handleTargetClick = (event) => {
        console.log(event)
        if (event.event_type === "work_order") {
            router.push(`/dashboard/workorder/${event.entity_id}`);
        }
        if (event.event_type === "pm_template") {
            router.push(`/dashboard/preventativemaintenance/${event.entity_id}`);
        }
        if (event.event_type === "asset") {
            router.push(`/dashboard/assets/${event.entity_id}`);
        }
    }


    const clearSearch = () => {
        setSearchTerm("");
        setType("");
        setAction("");
    }

    useEffect(() => {
        if (logs?.totalPages) {
            const buttons = [];
            for (let i = page; i < page + 5 && i <= logs.totalPages; i++) {
                buttons.push(i);
            }
            setPageButtons(buttons);
        }
    }, [logs]);
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.headerCard}>
                    <div className={styles.headerLeft}>
                        <div>
                            <p className={styles.eyebrow}>System</p>
                            <h1 className={styles.title}>Logs & Events</h1>
                            <p className={styles.subtitle}>
                                View the recent activity across work orders, preventative
                                maintenance, assets, and administrative changes.
                            </p>
                        </div>
                    </div>
                </div>



                <div className={styles.controlsCard}>
                    <div className={styles.controlsTopRow}>
                        <div className={styles.searchInputWrap}>
                            <Search size={16} />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.inputField}
                                placeholder="Search by event title, user, target ID, or type"
                            />
                        </div>

                        <div className={styles.actionsRow}>
                            <div className={styles.selectWrap}>
                                <FilterIcon size={16} className={styles.selectIcon} />

                                <select
                                    className={styles.statusBtn}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Type
                                    </option>
                                    <option value="work_order">Work Order</option>
                                    <option value="pm_template">PM Template</option>
                                    <option value="asset">Asset</option>
                                </select>
                            </div>
                            <div className={styles.selectWrap}>
                                <FilterIcon size={16} className={styles.selectIcon} />

                                <select
                                    className={styles.statusBtn}
                                    value={action}
                                    onChange={(e) => setAction(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Action
                                    </option>
                                    <option value="Created">Created</option>
                                    <option value="Modified">Modified</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Deleted">Deleted</option>
                                </select>
                            </div>
                            <button onClick={clearSearch} className={styles.secondaryBtn}>
                                <RefreshCwIcon size={16} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.quickFilters}>
                        <button className={styles.filterPillActive}>All</button>
                        <button className={styles.filterPill}>Created</button>
                        <button className={styles.filterPill}>Modified</button>
                        <button className={styles.filterPill}>Completed</button>
                        <button className={styles.filterPill}>Work Orders</button>
                        <button className={styles.filterPill}>PM</button>
                        <button className={styles.filterPill}>Assets</button>
                    </div>
                </div>

                {isLoading ? "" : <div className={styles.tableCard}>
                    <div className={styles.tableHeaderBar}>
                        <div>
                            <h3 className={styles.tableTitle}>Recent Activity</h3>
                            <p className={styles.tableSubtitle}>
                                Master list of recent changes and events happening across the app.
                            </p>
                        </div>
                        <div>
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
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.logsTable}>
                            <thead>
                                <tr className={styles.tableHeaders}>
                                    <th>Type</th>
                                    <th>Action</th>
                                    <th>Event</th>
                                    <th>User</th>
                                    <th>Target</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {logs?.items.map((event) => (
                                    <tr key={event.event_id} className={styles.tableRow}>
                                        <td className={styles.cell}>
                                            <div className={styles.typeWrap}>
                                                <div className={styles.typeIcon}>
                                                    {getTypeIcon(event.event_type)}
                                                </div>
                                                <span>{event.event_type}</span>
                                            </div>
                                        </td>

                                        <td className={styles.cell}>
                                            <span
                                                className={`${styles.badge} ${event.event_action === "Created"
                                                    ? styles.createdBadge
                                                    : event.event_action === "Modified"
                                                        ? styles.modifiedBadge
                                                        : event.event_action === "Deleted"
                                                            ? styles.deletedBadge
                                                            : styles.completedBadge
                                                    }`}
                                            >
                                                {event.event_action === "Created" && <Plus size={13} />}
                                                {event.event_action === "Deleted" && <Wrench size={13} />}
                                                {event.event_action === "Modified" && <Pencil size={13} />}
                                                {event.event_action === "Completed" && <CheckCircle2 size={13} />}
                                                {event.event_action}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.eventText}>{event.description}</span>
                                        </td>

                                        <td className={styles.cell}>
                                            <div className={styles.inlineMeta}>
                                                <div className={styles.userIcon}>
                                                    <User size={14} />
                                                </div>
                                                <span>{event.performed_by}</span>
                                            </div>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.targetPill} onClick={() => handleTargetClick(event)}>
                                                {event.event_action !== "Deleted" && event.entity_id}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>{new Date(event.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.paginationBar}>
                        <div className={styles.paginationInfo}>
                            Showing <strong>1–8</strong> of <strong></strong> events
                        </div>

                        <div className={styles.paginationControls}>
                            {logs?.hasPreviousPage && <button onClick={() => setPage(page - 1)} className={styles.pageBtn}>Previous</button>}

                            {pageButtons.map((btnPage) => (
                                <button
                                    key={btnPage}
                                    onClick={() => setPage(btnPage)}
                                    className={`${styles.pageNumber} ${page === btnPage ? styles.pageNumberActive : ""}`}
                                >
                                    {btnPage}
                                </button>
                            ))}
                            {logs?.hasNextPage && <button onClick={() => setPage(page + 1)} className={styles.pageBtn}>Next</button>}
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default LogsPage;