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
} from "lucide-react";
import styles from "../../../../../styles/WorkOrderDetailsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getWorkOrderById } from "@/api/workorders";
import { useParams } from "next/navigation";
import Image from "next/image";
const IMAGE_BASE = `http://localhost:5159/uploads/`;
const WorkOrderDetailsPage = () => {
  const params = useParams();

  const {
    data: workOrder,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workorder"],
    queryFn: () => getWorkOrderById(params.id),
    enabled: !!params.id,
  });
  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>There was an error loading this workorder</p>;
  console.log(workOrder);
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerIcon}>
            <ClipboardList size={22} />
          </div>

          <div className={styles.headerContent}>
            <div className={styles.headerTopRow}>
              <div>
                <h1 className={styles.title}>Work Order Details</h1>
                <p className={styles.subtitle}>
                  Review maintenance request details, assignment, and supporting
                  photos.
                </p>
              </div>

              <div className={styles.statusPill}>
                {workOrder.workorder[0].Status}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.sectionText}>
              Summary of the work order and current assignment.
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FileText size={16} />
                Work Order ID
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].Id}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <BadgeCheck size={16} />
                Status
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].Status}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Wrench size={16} />
                Asset
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].asset}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <User size={16} />
                Assigned To
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].FirstName}{" "}
                {workOrder.workorder[0].LastName}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <AlertCircle size={16} />
                Priority
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].Priority}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Due Date
              </div>
              <div className={styles.infoValue}>
                {Date(workOrder.workorder[0].DueDate)}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <User size={16} />
                Requestor
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].Requestor}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Created At
              </div>
              <div className={styles.infoValue}>
                {workOrder.workorder[0].Date}
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
              <div className={styles.descriptionCard}>
                {workOrder.workorder[0].Description}
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <Camera size={16} />
                Photos
              </div>

              <div className={styles.photoGrid}>
                {workOrder.photos?.map((photo) => (
                  <div key={photo.id} className={styles.photoCard}>
                    <div className={styles.photoImageWrap}>
                      <Image
                        unoptimized
                        src={IMAGE_BASE + photo.Path}
                        fill
                        className={styles.photoImage}
                        alt={photo.name || "Work order photo"}
                      />
                    </div>

                    <div className={styles.photoMeta}>
                      <p className={styles.photoName}>{photo.name}</p>
                      <p className={styles.photoHint}>Attached photo</p>
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
              <button type="button" className={styles.secondaryBtn}>
                Back
              </button>
              <button type="button" className={styles.primaryBtn}>
                Edit Work Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetailsPage;
