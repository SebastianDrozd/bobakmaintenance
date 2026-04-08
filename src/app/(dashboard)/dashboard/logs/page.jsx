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
} from "lucide-react";
import styles from "../../../../styles/LogsPage.module.css";
import { getLogs } from "@/api/logs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const mockEvents = [
    {
        id: 1,
        type: "Work Order",
        action: "Created",
        title: "Created work order for leaking valve in blast chill cooler",
        user: "Sebastian",
        target: "WO-1042",
        date: "2026-04-08 08:12 AM",
    },
    {
        id: 2,
        type: "Work Order",
        action: "Modified",
        title: "Updated priority and due date for mixer motor inspection",
        user: "Uperez",
        target: "WO-1038",
        date: "2026-04-08 07:41 AM",
    },
    {
        id: 3,
        type: "Work Order",
        action: "Completed",
        title: "Closed work order for smokehouse fan replacement",
        user: "Rgarcia",
        target: "WO-1026",
        date: "2026-04-07 04:26 PM",
    },
    {
        id: 4,
        type: "Preventative Maintenance",
        action: "Created",
        title: "Created PM template for checking Line 5 loader",
        user: "Sebastian",
        target: "PM-201",
        date: "2026-04-07 02:11 PM",
    },
    {
        id: 5,
        type: "Preventative Maintenance",
        action: "Modified",
        title: "Updated frequency and task steps for ammonia inspection",
        user: "Mjohnson",
        target: "PM-188",
        date: "2026-04-07 11:38 AM",
    },
    {
        id: 6,
        type: "Asset",
        action: "Created",
        title: "Added new asset: Vacuum Sealer",
        user: "Sebastian",
        target: "AST-1008",
        date: "2026-04-06 03:18 PM",
    },
    {
        id: 7,
        type: "Asset",
        action: "Modified",
        title: "Updated owner and service date for Blast Chill Cooler",
        user: "Tdawson",
        target: "AST-1001",
        date: "2026-04-06 10:05 AM",
    },
    {
        id: 8,
        type: "Admin",
        action: "Created",
        title: "Added new mechanic account for Mike Johnson",
        user: "Sebastian",
        target: "USR-014",
        date: "2026-04-05 01:44 PM",
    },
];

const getTypeIcon = (type) => {
    switch (type) {
        case "work_order":
            return <ClipboardList size={15} />;
        case "preventative_maintenance":
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
    const { data: logs, isLoading, isError } = useQuery({
        queryKey: ['logs'],
        queryFn: getLogs
    })
    const router = useRouter();


    const handleTargetClick = (event) => {
        console.log(event)
        if(event.event_type === "work_order"){
            router.push(`/dashboard/workorder/${event.entity_id}`);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
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

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>Total Events</p>
                        <h3 className={styles.statValue}>{mockEvents.length}</h3>
                    </div>

                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>Work Order Events</p>
                        <h3 className={styles.statValue}>
                            {mockEvents.filter((x) => x.type === "Work Order").length}
                        </h3>
                    </div>

                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>PM Events</p>
                        <h3 className={styles.statValue}>
                            {
                                mockEvents.filter(
                                    (x) => x.type === "Preventative Maintenance"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>Asset / Admin Events</p>
                        <h3 className={styles.statValue}>
                            {mockEvents.filter((x) => x.type === "Asset" || x.type === "Admin").length}
                        </h3>
                    </div>
                </div>

                <div className={styles.controlsCard}>
                    <div className={styles.controlsTopRow}>
                        <div className={styles.searchInputWrap}>
                            <Search size={16} />
                            <input
                                className={styles.inputField}
                                placeholder="Search by event title, user, target ID, or type"
                            />
                        </div>

                        <div className={styles.actionsRow}>
                            <button className={styles.secondaryBtn}>
                                <Filter size={16} />
                                Type
                            </button>

                            <button className={styles.secondaryBtn}>
                                <SlidersHorizontal size={16} />
                                Action
                            </button>

                            <button className={styles.secondaryBtn}>
                                <User size={16} />
                                User
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

                <div className={styles.tableCard}>
                    <div className={styles.tableHeaderBar}>
                        <div>
                            <h3 className={styles.tableTitle}>Recent Activity</h3>
                            <p className={styles.tableSubtitle}>
                                Master list of recent changes and events happening across the app.
                            </p>
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
                                {logs?.map((event) => (
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
                                                            : styles.completedBadge
                                                    }`}
                                            >
                                                {event.event_action === "Created" && <Plus size={13} />}
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
                                                {event.entity_id}
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
                            Showing <strong>1–8</strong> of <strong>{mockEvents.length}</strong> events
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
        </div>
    );
};

export default LogsPage;