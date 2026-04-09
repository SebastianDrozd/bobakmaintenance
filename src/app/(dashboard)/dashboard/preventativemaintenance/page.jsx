"use client";

import { useContext, useState } from "react";
import {
    CalendarDays,
    Clock3,
    Factory,
    Filter,
    Plus,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    User,
    Wrench,
    X,
    CheckCircle2,
    ListOrdered,
    GripVertical,
    Trash2,
    SortDesc,
    RefreshCw,
} from "lucide-react";
import styles from "../../../../styles/PreventativeMaintenancePage.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssets } from "@/api/assets";
import { AuthContext } from "@/util/AuthProvider";
import { createNewPmTemplate, getShortPmTemplates, getShortPmTemplatesQuery } from "@/api/preventativeMaintenance";
import { useRouter } from "next/navigation";
import { getAllMechanics } from "@/api/mechanics";


const mockPmTasks = [
    {
        id: 1,
        taskName: "Check Line 5 Loader",
        asset: "Line 5 Loader",
        area: "Packaging",
        frequency: "Weekly",
        assignedTo: "Uperez",
        lastCompleted: "2026-03-19",
        nextDue: "2026-03-26",
        status: "Due Soon",
    },
    {
        id: 2,
        taskName: "Inspect Ammonia System",
        asset: "Ammonia System",
        area: "Utilities",
        frequency: "Monthly",
        assignedTo: "Rgarcia",
        lastCompleted: "2026-03-01",
        nextDue: "2026-04-01",
        status: "Scheduled",
    },
    {
        id: 3,
        taskName: "Lubricate Mixer Bearings",
        asset: "Mixer Line 2",
        area: "Processing",
        frequency: "Bi-Weekly",
        assignedTo: "Mjohnson",
        lastCompleted: "2026-03-12",
        nextDue: "2026-03-26",
        status: "Due Today",
    },
    {
        id: 4,
        taskName: "Check Blast Chill Door Seals",
        asset: "Blast Chill Cooler",
        area: "Packaging",
        frequency: "Monthly",
        assignedTo: "Tdawson",
        lastCompleted: "2026-02-15",
        nextDue: "2026-03-15",
        status: "Overdue",
    },
];

const PreventativeMaintenancePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [frequency, setFrequency] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, SetPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const router = useRouter();
    const { data: pmTemplates, isLoading, isError } = useQuery({
        queryKey: ["pmTemplates", page, pageSize, searchTerm, frequency],
        queryFn: () => getShortPmTemplatesQuery(page, pageSize, searchTerm, frequency)
    })

    const handleReset = () => {
        setSearchTerm("");
        setFrequency("");
    }
    console.log("These are pmtemplates", pmTemplates)

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.headerCard}>
                    <div className={styles.headerLeft}>

                        <div>
                            <p className={styles.eyebrow}>Maintenance</p>
                            <h1 className={styles.title}>Preventative Maintenance</h1>
                            <p className={styles.subtitle}>
                                Track scheduled maintenance tasks, recurring inspections, and
                                upcoming preventative work across the plant.
                            </p>
                        </div>
                    </div>

                    <button
                        className={styles.primaryBtn}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={16} />
                        New PM Task
                    </button>
                </div>



                <div className={styles.controlsCard}>
                    <div className={styles.controlsTopRow}>
                        <div className={styles.searchInputWrap}>
                            <Search size={16} />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.inputField}
                                placeholder="Search by task name, asset, area, or mechanic"
                            />
                        </div>

                        <div className={styles.actionsRow}>
                            <div className={styles.selectWrap}>

                                <SlidersHorizontal size={16} className={styles.selectIcon} />
                                <select
                                    className={styles.statusBtn}
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Frequency
                                    </option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Bi-Weekly">Bi-Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                </select>
                            </div>
                            <button onClick={handleReset} className={styles.iconBtn}>
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    </div>


                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableHeaderBar}>
                        <div>
                            <h3 className={styles.tableTitle}>Scheduled PM Tasks</h3>
                            <p className={styles.tableSubtitle}>
                                Manage recurring preventative maintenance tasks and upcoming due
                                dates.
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
                        <table className={styles.pmTable}>
                            <thead>
                                <tr className={styles.tableHeaders}>
                                    <th>Task</th>
                                    <th>Asset</th>
                                    <th>Frequency</th>
                                    <th>Assigned To</th>
                                    <th>Last Completed</th>
                                    <th>Next Due</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading && <div>Loading...</div>}
                                {pmTemplates && pmTemplates.items.map((task) => (
                                    <tr onClick={() => router.push(`/dashboard/preventativemaintenance/${task.id}`)} key={task.id} className={styles.tableRow}>
                                        <td className={styles.cell}>
                                            <div className={styles.taskNameWrap}>
                                                <div className={styles.taskIcon}>
                                                    <Wrench size={15} />
                                                </div>
                                                <span>{task.description}</span>
                                            </div>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.inlineMeta}>
                                                <Factory size={14} />
                                                {task.asset}
                                            </span>
                                        </td>



                                        <td className={styles.cell}>
                                            <span className={styles.frequencyPill}>
                                                <Clock3 size={14} />
                                                {task.frequency}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.inlineMeta}>
                                                <User size={14} />
                                                {task.firstName} {task.lastName}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.inlineMeta}>
                                                <CheckCircle2 size={14} />
                                                {task.lastRun?.split("T")[0]}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>
                                            <span className={styles.inlineMeta}>
                                                <CalendarDays size={14} />
                                                {task.nextRunDate?.split("T")[0]}
                                            </span>
                                        </td>

                                        <td className={styles.cell}>
                                            <span
                                                className={`${styles.badge} ${task.status === "Scheduled"
                                                    ? styles.scheduledBadge
                                                    : task.status === "Due Soon"
                                                        ? styles.dueSoonBadge
                                                        : task.lastRun === "0001-01-01T00:00:00"
                                                            ? styles.dueTodayBadge
                                                            : styles.overdueBadge
                                                    }`}
                                            >
                                                {task.lastRun === "0001-01-01T00:00:00"
                                                    ? "Never Started"
                                                    : task.lastRun === task.nextRunDate
                                                        ? "Due Today"
                                                        : task.status
                                                            ? task.lastRun > task.nextRunDate
                                                                ? "Overdue"
                                                                : task.status
                                                            : "Scheduled"}
                                            </span>
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
                                {pmTemplates?.items?.length > 0 ? (page - 1) * pageSize + 1 : 0}–
                                {Math.min(page * pageSize, pmTemplates?.totalCount)}
                            </strong>{" "}
                        </div>

                        <div className={styles.paginationControls}>
                            {pmTemplates?.hasNextPage && <button className={styles.pageBtn}>Previous</button>}

                            <button className={`${styles.pageNumber} ${styles.pageNumberActive}`}>
                                1
                            </button>

                            {pmTemplates?.hasNextPage && <button className={styles.pageBtn}>Next</button>}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <CreatePmTaskModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const CreatePmTaskModal = ({ onClose }) => {
    const mockSteps = [
        "Inspect loader belt tension",
        "Check sensor alignment",
        "Lubricate moving parts",
        "Verify safety guards are secure",
    ];
    const [tasks, setTasks] = useState([])
    const [taskDescription, setTaskDescription] = useState("")
    const [description, setDescription] = useState("")
    const [asset, setAsset] = useState("")
    const [mechanic, setMechanic] = useState("")
    const [priority, setPriority] = useState("")
    const [frequency, setFrequency] = useState("")
    const [dueDate, setDueDate] = useState("")
    const auth = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [hasError, setHasError] = useState(false)
    const handleAddTask = () => {
        tasks.push(taskDescription)
        setTasks([...tasks])
        setTaskDescription("")
    }

    const handleDeleteTask = (index) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
    }

    const { data: mechanics } = useQuery({
        queryKey: ["mecahnics"],
        queryFn: () => getAllMechanics()

    })

    const { data: assets } = useQuery({
        queryKey: ["assets"],
        queryFn: () => getAssets()
    })


    const handleSavePm = (e) => {
        e.preventDefault()
        if (!priority || !mechanic || !frequency || !dueDate || !description) {
            setHasError(true);

            setTimeout(() => {
                setHasError(false)
            }, 3000)
            return
        }

        const newPmTask = {
            Asset: asset,
            Priority: priority,
            Mechanic: Number(mechanic),
            Frequency: frequency,
            NextRunDate: dueDate,
            Description: description,
            Tasks: tasks,
            CreatedBy: auth.user.username
        }
        console.log("new PM task", newPmTask)
        saveMutation.mutate(newPmTask)
    }

    const saveMutation = useMutation({

        mutationFn: (newPmTask) => createNewPmTemplate(newPmTask),
        onSuccess: (data) => {
            console.log("PM task created successfully", data)
            queryClient.invalidateQueries(["pmTemplates"])
            onClose()
        },
        onError: (error) => {
            console.error("Error creating PM task", error)
        }
    })
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div>
                        <p className={styles.modalEyebrow}>Preventative Maintenance</p>
                        <h2 className={styles.modalTitle}>Create PM Task</h2>
                        <p className={styles.modalSubtitle}>
                            Add a recurring preventative maintenance task to the schedule.
                        </p>
                        {hasError &&
                            <p className={styles.error}>Please fill in all required fields </p>}
                    </div>

                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <form className={styles.modalForm}>
                    <div className={styles.formGrid}>


                        <div className={styles.formGroup}>
                            <label className={styles.label}>Asset</label>
                            <select onChange={(e) => setAsset(e.target.value)} className={styles.modalInput}>
                                <option value="">Select asset</option>
                                {assets?.map((asset) => (
                                    <option key={asset.compid} value={asset.compid}>
                                        {asset.comp_desc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Priority<span className={styles.asterisk}>*</span></label>
                            <select onChange={(e) => setPriority(e.target.value)} className={styles.modalInput}>
                                <option value="">Select priority</option>
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Assigned To <span className={styles.asterisk}>*</span></label>
                            <select onChange={(e) => setMechanic(e.target.value)} className={styles.modalInput}>
                                <option value="">Select mechanic</option>
                                {mechanics?.map((mechanic) => (
                                    <option key={mechanic.id} value={mechanic.id}>
                                        {mechanic.firstName} {mechanic.lastname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Frequency <span className={styles.asterisk}>*</span></label>
                            <select onChange={(e) => setFrequency(e.target.value)} className={styles.modalInput}>
                                <option value="">Select frequency</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Bi-Weekly</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Next Due Date <span className={styles.asterisk}>*</span></label>
                            <input onChange={(e) => setDueDate(e.target.value)} type="date" className={styles.modalInput} />
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Task Description <span className={styles.asterisk}>*</span></label>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles.textarea}
                                placeholder="Add instructions for the preventative maintenance task, inspection steps, and any notes for the mechanic"
                            />
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <div className={styles.stepsSection}>
                                <div className={styles.stepsHeader}>
                                    <div>
                                        <div className={styles.stepsTitleRow}>
                                            <ListOrdered size={16} />
                                            <span className={styles.stepsTitle}>Procedure Steps</span>
                                        </div>
                                        <p className={styles.stepsSubtitle}>
                                            Add the ordered list of tasks that should be completed each time this PM is performed.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.addStepRow}>
                                    <input
                                        className={styles.modalInput}
                                        placeholder="Add a procedure step, for example: Inspect loader belt tension"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                    />
                                    <button onClick={handleAddTask} type="button" className={styles.addStepBtn}>
                                        <Plus size={16} />
                                        Add Step
                                    </button>
                                </div>

                                <div className={styles.stepsList}>
                                    {tasks.map((step, index) => (
                                        <div key={index} className={styles.stepItem}>
                                            <div className={styles.stepLeft}>
                                                <div className={styles.stepDrag}>
                                                    <GripVertical size={15} />
                                                </div>

                                                <div className={styles.stepNumber}>
                                                    {index + 1}
                                                </div>

                                                <div className={styles.stepContent}>
                                                    <p className={styles.stepText}>{step}</p>
                                                </div>
                                            </div>

                                            <button onClick={() => handleDeleteTask(index)} type="button" className={styles.stepDeleteBtn}>
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <div className={styles.modalFooterText}>
                            This task can be edited later as your PM workflow grows.
                        </div>

                        <div className={styles.buttonRow}>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button onClick={handleSavePm} type="submit" className={styles.submitBtn}>
                                Save PM Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PreventativeMaintenancePage;