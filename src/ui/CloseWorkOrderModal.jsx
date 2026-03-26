"use client";

import { useContext, useEffect, useState } from "react";
import styles from "../styles/ui/CloseWorkOrderModal.module.css";
import { AuthContext } from "@/util/AuthProvider";

const CloseWorkOrderModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Close Work Order",
}) => {
  const [closeDescription, setCloseDescription] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [photo, setPhoto] = useState(null);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ClosedDescription", closeDescription);
    formData.append("ClosedHours", hours);
    formData.append("ClosedMinutes", minutes);
    formData.append("ClosedBy",auth.user.username);
    if (photo) {
      formData.append("ClosedPhoto", photo);
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.formGroup}>
              <label htmlFor="closeDescription" className={styles.label}>
                Close Description
              </label>
              <textarea
                id="closeDescription"
                className={styles.textarea}
                placeholder="Describe what was done to complete this work order..."
                value={closeDescription}
                onChange={(e) => setCloseDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div className={styles.timeSection}>
              <h3 className={styles.sectionTitle}>Completion Time</h3>
              <div className={styles.timeRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="hours" className={styles.label}>
                    Hours
                  </label>
                  <input
                    id="hours"
                    type="number"
                    min="0"
                    className={styles.input}
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="minutes" className={styles.label}>
                    Minutes
                  </label>
                  <input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    className={styles.input}
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="photoUpload" className={styles.label}>
                Upload Photo
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handlePhotoChange}
              />
              {photo && (
                <p className={styles.fileName}>
                  Selected file: {photo.name}
                </p>
              )}
            </div>
          </div>

         <div className={styles.footer}>
  <div className={styles.footerText}>
    Update the fields below and save your changes.
  </div>

  <div className={styles.buttonRow}>
    <button type="button" className={styles.cancelBtn}>Cancel</button>
    <button type="submit" className={styles.submitBtn}>Save Changes</button>
  </div>
</div>
        </form>
      </div>
    </div>
  );
};

export default CloseWorkOrderModal;