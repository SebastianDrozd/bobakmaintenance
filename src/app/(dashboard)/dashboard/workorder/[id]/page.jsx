"use client";

import {
  ClipboardList,
  Wrench,
  User,
  AlertCircle,
  CalendarDays,
  BadgeCheck,
  Camera,
  FileText,
  CheckCircle2,
  Clock3,
  PencilIcon,
  Edit,
  XIcon,
  Printer,
} from "lucide-react";
import styles from "../../../../../styles/WorkOrderDetailsPage.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { closeWorkOrder, getWorkOrderById, updateWorkOrder } from "@/api/workorders";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import CloseWorkOrderModal from "@/ui/CloseWorkOrderModal";
import { useEffect, useState } from "react";
import { getAssets } from "@/api/assets";
import { getAllMechanics } from "@/api/mechanics";
import toast, { Toaster } from "react-hot-toast";
import { generateWorkOrderPdf } from "@/api/pdf";

const IMAGE_BASE = `http://localhost:5159/uploads/`;
const WorkOrderDetailsPage = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [wantsEdit, setWantsEdit] = useState(false);
  const [wantsAssets, setWantsAssets] = useState(false);
  const [wantsMechanics, setWantsMechanics] = useState(false);

  //form fields
  const [asset, SetAsset] = useState("");
  const [mechanic, setMechanic] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("")

  const { data: assets, } = useQuery({ queryKey: ["assets"], queryFn: () => getAssets(), enabled: !!wantsEdit });
  const { data: mechanics, isLoading: mechanicsLoading } = useQuery({ queryKey: ["mecahnics"], queryFn: () => getAllMechanics() });
  const { data: workOrder, isLoading, isError } = useQuery({ queryKey: ["workorder"], queryFn: () => getWorkOrderById(params.id), enabled: !!params.id });

  console.log(workOrder)
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCloseSubmit = (data) => {
    const woId = params.id;
    closeMutation.mutate(data);
  };
  const closeMutation = useMutation({
    mutationFn: (data) => closeWorkOrder(data, params.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["workorder"]);
      console.log("sucess data", data);
      setModalOpen(false);
      toast.success("You have sucessfully closed this work order");
    },
    onError: (err) => {
      toast.error("There was a problem closing this work order")
    },
  });

  useEffect(() => {
    if (workOrder) {
      setDescription(workOrder?.workorder[0]?.Description)
      SetAsset(workOrder?.workorder[0]?.Asset)
      setMechanic(workOrder?.workorder[0]?.Mechanic)
      setPriority(workOrder?.workorder[0]?.Priority)
      setDueDate(workOrder?.workorder[0]?.DueDate?.slice(0, workOrder?.workorder[0]?.DueDate?.indexOf("T")))
    }
  }, [workOrder])

  console.log(dueDate)
  //handlers 
  const handleChooseAsset = (e) => {
    SetAsset(e.target.value);
  };

  const handleChooseMechanic = (e) => {

    setMechanic(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDueDateChange = (e) => {
    console.log(e.target.value)
    setDueDate(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleViewPmTemplate = () => {
    router.push(`/dashboard/preventativemaintenance/${workOrder.workorder[0].PmTemplateId}`)
  }

  const handleUpdateBtn = () => {
    const formData = new FormData();
    formData.append("Description", description);
    formData.append("Priority", priority);
    formData.append("DueDate", dueDate);
    formData.append("Mechanic", mechanic);
    formData.append("Asset", asset);

    updateMutation.mutate(formData)
  }

  const updateMutation = useMutation({
    mutationFn: (data) => updateWorkOrder(data, params.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["workorder"]);
      toast.success("Work order updated sucessfully")
      setWantsEdit(false)
    },
    onError: (data) => {
      toast.error("There was an error updating the work order")
    }
  })

  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>There was an error loading this workorder</p>;

  const printPdf = async () => {
    const res = await generateWorkOrderPdf(params.id)
    const url = window.URL.createObjectURL(res.data);
    window.open(url);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
         
   
          <div className={styles.headerContent}>
            <div className={styles.headerTopRow}>
              <div>
                <h1 className={styles.title}>Work Order Details</h1>
                <p className={styles.subtitle}>
                  Review maintenance request details, assignment, and supporting
                  photos.
                </p>
              </div>

              <div
                className={
                  workOrder?.workorder[0]?.Status == "Open"
                    ? styles.statusPill
                    : styles.completedStatusPill
                }
              >
                {workOrder?.workorder[0]?.Status}
              </div>
            </div>
          </div>
        </div>
        {workOrder?.workorder[0]?.Status == "Completed" && (
          <div className={styles.completionSection}>
            <div className={styles.completionHeader}>
              <div>

                <h3 className={styles.completionTitle}>
                  Closed Work Order Details
                </h3>
                <p className={styles.completionSubtitle}>
                  Final notes, labor time, completion info, and closeout
                  photo.
                </p>
              </div>
            </div>

            <div className={styles.completionGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <ClipboardList size={16} />
                  Closed Description
                </div>
                <div className={styles.infoValue}>
                  {workOrder.workorder[0].ClosedDescription ||
                    "No closing description provided."}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Clock3 size={16} />
                  Hours
                </div>
                <div className={styles.infoValue}>
                  {workOrder.workorder[0].ClosedHours ?? "0"}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Clock3 size={16} />
                  Minutes
                </div>
                <div className={styles.infoValue}>
                  {workOrder.workorder[0].CLosedMinutes ?? "0"}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <User size={16} />
                  Closed By
                </div>
                <div className={styles.infoValue}>
                  {workOrder.workorder[0].ClosedBy || "Unknown"}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <CalendarDays size={16} />
                  Closed Date
                </div>
                <div className={styles.infoValue}>
                  {workOrder.workorder[0].ClosedDate ||
                    "No close date available"}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <CalendarDays size={16} />
                  Total Days Open
                </div>
                {new Date().get}
                <div className={styles.infoValue}>
                  {new Date(workOrder.workorder[0].ClosedDate).getDay() - new Date(workOrder.workorder[0].Date).getDay()||
                    "4 days"}
                </div>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <Camera size={16} />
                Closed Photo
              </div>

              {workOrder.closedPhoto[0]?.Path ? (
                <div className={styles.closedPhotoCard}>
                  <div className={styles.closedPhotoWrap}>
                    <Image
                      unoptimized
                      src={IMAGE_BASE + workOrder?.closedPhoto[0]?.Path}
                      fill
                      className={styles.closedPhoto}
                      alt="Closed work order photo"
                    />
                  </div>

                  <div className={styles.photoMeta}>
                    <p className={styles.photoName}>Closeout Photo</p>
                    <p className={styles.photoHint}>
                      Uploaded when work order was completed
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyStateCard}>
                  No closeout photo was attached.
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.detailsCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerRow}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.sectionText}>
                Summary of the work order and current assignment.
              </p>
            </div>
            <div className={styles.btnRow}>
              {workOrder?.workorder[0]?.Status == "Open" &&  <button onClick={() => setWantsEdit(!wantsEdit)} className={styles.editBtn}><Edit className={styles.icon} /></button>}
             
              {wantsEdit && <button onClick={handleUpdateBtn} className={styles.updateBtn}>Update</button>}
            </div>

          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FileText size={16} />
                Type
              </div>
              <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.Type == "Regular" ? "Regular Maintenance" : workOrder?.workorder[0]?.Type == "PM" ? "Preventative Maintenance" : workOrder?.workorder[0]?.Type}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <BadgeCheck size={16} />
                Status
              </div>
              <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.Status}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Wrench size={16} />
                Asset
              </div>
              {wantsEdit ? <select
                onChange={handleChooseAsset}
                onClick={() => setWantsAssets(true)}
                className={styles.inputField}
                value={asset}
              >
                <option value="">Select an asset</option>
                {assets &&
                  assets.map((asset) => (
                    <option key={asset.compid} value={asset.compid}>{asset.comp_desc}</option>
                  ))}
              </select> : <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.comp_desc}
              </div>}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <User size={16} />
                Assigned To
              </div>
              {wantsEdit ? <select
                onChange={handleChooseMechanic}
                onClick={() => setWantsMechanics(true)}
                className={styles.inputField}
                value={mechanic}
              >
                <option value="">Select a mechanic</option>
                {mechanics &&
                  mechanics.map((mechanic) => (
                    <option key={mechanic.id} value={mechanic.id}>
                      {mechanic.firstName + " " + mechanic.lastname}
                    </option>
                  ))}
              </select> : <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.FirstName}{" "}
                {workOrder?.workorder[0]?.LastName}
              </div>}

            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <AlertCircle size={16} />
                Priority
              </div>
              {wantsEdit ? <select
                onChange={handlePriorityChange}
                className={styles.inputField}
                value={priority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select> : <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.Priority}
              </div>}

            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Due Date
              </div>
              {wantsEdit ? <input
                onChange={handleDueDateChange}
                type="date"
                className={styles.inputField}
                value={dueDate}
              /> : <div className={styles.infoValue}>
                {new Date(workOrder?.workorder[0]?.DueDate).toDateString()}
              </div>}

            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <User size={16} />
                Requestor
              </div>
              <div className={styles.infoValue}>
                {workOrder?.workorder[0]?.Requestor}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Created On
              </div>
              <div className={styles.infoValue}>
                {new Date(workOrder?.workorder[0]?.Date).toDateString()}
              </div>
            </div>
            {workOrder?.workorder[0]?.Type == "PM" && <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Pm Template Link
              </div>
              <div className={styles.infoValue}>
               <button className={styles.primaryBtn} onClick={handleViewPmTemplate}>
                 View
               </button>
              </div>
            </div>}
          </div>

          <div className={styles.divider} />

          <div className={styles.contentSection}>
            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <ClipboardList size={16} />
                Description
              </div>
              {wantsEdit ? <textarea
                onChange={handleDescriptionChange}
                value={description}
                className={`${styles.inputField} ${styles.textareaField}`}

              /> : <div className={styles.descriptionCard}>
                {workOrder?.workorder[0]?.Description}
              </div>}

            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <Camera size={16} />
                Photos
              </div>

              <div className={styles.photoGrid}>
                {workOrder?.photos?.map((photo) => (
                  <div key={photo.id} className={styles.photoCard}>
                    <div className={styles.photoImageWrap}>
                      {wantsEdit && <p className={styles.photoHint}><XIcon /></p>}
                      <Image
                        unoptimized
                        src={IMAGE_BASE + photo.Path}
                        fill
                        className={styles.photoImage}
                        alt={photo.name || "Work order photo"}
                      />
                    </div>


                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className={styles.footer}>
            <div className={styles.helperText}>
              This page is read-only and meant for quickly reviewing the full
              work order.
            </div>

            <div className={styles.buttonRow}>
              <button
                onClick={() => router.back()}
                type="button"
                className={styles.secondaryBtn}
              >
                Back
              </button>
              {workOrder?.workorder[0]?.Status == "Open" && (
                <button
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className={styles.closeBtn}
                >
                  Close Work Order
                </button>
              )}
               <button className={styles.secondaryBtn} onClick={printPdf}><Printer/></button>
            </div>
          </div>
        </div>
      </div>
      <CloseWorkOrderModal
        isOpen={modalOpen}
        onClose={handleClose}
        onSubmit={handleCloseSubmit}
      />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default WorkOrderDetailsPage;
