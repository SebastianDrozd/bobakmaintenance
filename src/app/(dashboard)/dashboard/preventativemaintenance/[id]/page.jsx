"use client";

import {
    CalendarDays,
    ClipboardList,
    ShieldCheck,
    User,
    Wrench,
    AlertCircle,
    Clock3,
    ListOrdered,
    CheckCircle2,
    Edit,
} from "lucide-react";
import styles from "../../../../../styles/ViewPreventativeMaintenancePage.module.css";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePmTemplate, getPmTemplateById, updatePmTemplate } from "@/api/preventativeMaintenance";
import { useContext, useEffect, useState } from "react";
import { getAllMechanics } from "@/api/mechanics";
import { getAssets } from "@/api/assets";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/util/AuthProvider";

const ViewPreventativeMaintenancePage = () => {
    const params = useParams();
    const [wantsEdit, setWantsEdit] = useState(false)
    const queryClient = useQueryClient();
    const router = useRouter();
    //formdata
    const [asset,setAsset] = useState('')
    const [mechanic,setMechanic] = useState('')
    const [priority,setPriority] = useState('')
    const [nextRunDate,setNextRunDate] = useState('')
    const [frequency,setFrequency] = useState('')
    const [description,setDescription] = useState('')
    const auth = useContext(AuthContext);

    const { data: template, isLoading, isError } = useQuery({queryKey: ["pmTemplate", params.id],queryFn: () => getPmTemplateById(params.id),enabled: !!params.id})
    const {data : mechanics} = useQuery({queryKey : ['mechanics'],queryFn : () => getAllMechanics()})
    const {data : assets} = useQuery({queryKey : ['assets'],queryFn : () => getAssets(),enabled : !!wantsEdit})



    useEffect(() => {
        if (template) {
            setAsset(template.asset.id)
            setMechanic(template.mechanic.id)
            setPriority(template.pmTemplate.priority)
            setNextRunDate(template.pmTemplate.nextRunDate)
            setFrequency(template.pmTemplate.frequency)
            setDescription(template.pmTemplate.description)
        }
    },template)



    const upDateMutation = useMutation({
        mutationFn : (data) => updatePmTemplate(params.id, data),
        onSuccess : () => {
            toast.success('Preventative maintenance template updated successfully!')
            setWantsEdit(false)
            queryClient.invalidateQueries(['pmTemplate', params.id])
        },
        onError : () => {
            toast.error('Error updating preventative maintenance template. Please try again.')
        }
    })

    const deleteMutation = useMutation({
        mutationFn : () => deletePmTemplate(params.id),
        onSuccess : () => {
            toast.success('Preventative maintenance template deleted successfully!')
            router.push('/dashboard/preventativemaintenance')
        },
        onError : (err) => {
            console.log(err)
            toast.error('Error deleting preventative maintenance template. Please try again.')
        }
    })
    const handleUpdateBtn = () => {
        const updateRequest = {
            Asset : asset,
            Mechanic : mechanic,
            Priority : priority,
            NextRunDate : nextRunDate,
            Frequency : frequency,
            Description : description,
            UpdatedBy : auth.user.username
        }
        console.log(updateRequest)
        upDateMutation.mutate(updateRequest)
    }
    const handleDeleteBtn = () => {
        if (confirm('Are you sure you want to delete this preventative maintenance template? This action cannot be undone.')) {
            deleteMutation.mutate()
        }
    }
    

    if (isLoading) {
        return <div className={styles.page}>
            <div className={styles.container}>
                <p>Loading preventative maintenance template...</p>
            </div>
        </div>
    }
    if (isError) {
        return <div className={styles.page}>
            <div className={styles.container}>
                <p>Error loading preventative maintenance template. Please try again later.</p>
            </div>
        </div>
    }
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.headerCard}>
                    <div className={styles.headerLeft}>
                        <div className={styles.headerIcon}>
                            <ShieldCheck size={22} />
                        </div>

                        <div>
                            <p className={styles.eyebrow}>Preventative Maintenance</p>
                            <p className={styles.subtitle}>
                                Review the preventative maintenance template, schedule details,
                                and required procedure steps.
                            </p>
                        </div>
                    </div>

                    <div className={styles.headerActions}>
                        <div className={styles.frequencyPill}>
                            <Clock3 size={14} />
                            {template.pmTemplate.frequency}
                        </div>

                        <div className={styles.statusPill}>
                            <CheckCircle2 size={14} />
                            {template.pmTemplate.status || 'Active'}
                        </div>
                    </div>
                </div>

                <div className={styles.detailsCard}>
                    <div className={styles.headerRow}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p className={styles.sectionText}>
                                Main preventative maintenance information and scheduling details.
                            </p>
                        </div>
                        <div className={styles.btnRow}>
                            <button onClick={() => setWantsEdit(!wantsEdit)} className={styles.editBtn}><Edit /></button>
                            {wantsEdit && <button onClick={handleUpdateBtn} className={styles.updateBtn}>Update</button>}
                        </div>
                    </div>


                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <Wrench size={16} />
                                Asset
                            </div>
                            {wantsEdit ? <select className={styles.inputField} value={asset} onChange={(e) => setAsset(e.target.value)}>
                                <option value="">Select an asset</option>
                                {assets?.map((asset) => (
                                    <option key={asset.compid} value={asset.compid}>
                                        {asset.comp_desc}
                                    </option>
                                ))}
                            </select> :  <div className={styles.infoValue}>{template.asset.description}</div>}
                           
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <User size={16} />
                                Mechanic
                            </div>
                            {wantsEdit ? <select className={styles.inputField} value={mechanic} onChange={(e) => setMechanic(e.target.value)}>
                                {mechanics?.map((mech) => (
                                    <option key={mech.id} value={mech.id}>
                                        {mech.firstName} {mech.lastname}
                                    </option>
                                ))}
                            </select> :  <div className={styles.infoValue}>{template.mechanic.firstName} {template.mechanic.lastname}</div>}
                           
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <AlertCircle size={16} />
                                Priority
                            </div>
                            {wantsEdit ? <select className={styles.inputField} value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                 <option value="Urgent">Urgent</option>
                            </select> : <div className={styles.infoValue}>{template.pmTemplate.priority}</div>}
                            
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <CalendarDays size={16} />
                                Next Run Date
                            </div>
                            <div className={styles.infoValue}>
                                {wantsEdit ? <input className={styles.inputField} type="date" value={nextRunDate.split('T')[0]} onChange={(e) => setNextRunDate(e.target.value)} /> :   new Date(template.pmTemplate.nextRunDate).toLocaleDateString()}
                               
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <User size={16} />
                                Created By
                            </div>
                            <div className={styles.infoValue}>{template.pmTemplate.createdBy}</div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <CalendarDays size={16} />
                                Last Run Date
                            </div>
                            <div className={styles.infoValue}>
                                {template.pmTemplate.last == null ? 'N/A' : new Date(template.pmTemplate.lastRun).toLocaleDateString()}
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <Clock3 size={16} />
                                Frequency
                            </div>
                            {wantsEdit ? <select className={styles.inputField} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                  <option value="Bi-Weekly">Bi-Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Annually">Annually</option>
                            </select> :  <div className={styles.infoValue}>{template.pmTemplate.frequency}</div>}
                           
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoLabel}>
                                <CalendarDays size={16} />
                                Created Date
                            </div>
                            <div className={styles.infoValue}> 
                                {new Date(template.pmTemplate.createdDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.contentSection}>
                        <div className={styles.block}>
                            <div className={styles.blockLabel}>
                                <ClipboardList size={16} />
                                Description
                            </div>
                            {wantsEdit ? <textarea  className={`${styles.inputField} ${styles.textareaField}`} value={description} onChange={(e) => setDescription(e.target.value)} /> : <div className={styles.descriptionCard}>{template.pmTemplate.description}</div>      }
                            
                        </div>

                        <div className={styles.block}>
                            <div className={styles.blockLabel}>
                                <ListOrdered size={16} />
                                Required Tasks
                            </div>

                            <div className={styles.tasksCard}>
                                <div className={styles.tasksHeader}>
                                    <div>
                                      
                                        <p className={styles.tasksSubtitle}>
                                            These steps should be completed in order whenever this PM
                                            task is performed.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.tasksList}>
                                    {template.tasks.map((task, index) => (
                                        <div key={index} className={styles.taskItem}>
                                            <div className={styles.taskNumber}>{index + 1}</div>
                                            <div className={styles.taskContent}>
                                                <p className={styles.taskText}>{task.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.helperText}>
                            This page shows the preventative maintenance template and its
                            current scheduling details in a read-only format.
                        </div>

                        <div className={styles.buttonRow}>
                            <button type="button" className={styles.secondaryBtn} onClick={() => router.back()}>
                                Back
                            </button>
                            <button type="button" className={styles.deleteBtn} onClick={handleDeleteBtn}>
                                Delete Template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
              <Toaster position="bottom-right" />
        </div>
    );
};

export default ViewPreventativeMaintenancePage;