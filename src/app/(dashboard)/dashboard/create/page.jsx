"use client";
import {
  ClipboardList,
  CalendarDays,
  User,
  Wrench,
  AlertCircle,
  ImagePlus,
  Upload,
  X,
} from "lucide-react";
import styles from "../../../../styles/CreateWorkOrderPage.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAssets } from "@/api/assets";
import { useState } from "react";
import getAllMechanics from "@/api/mechanics";
import { saveWorkOrder } from "@/api/workorders";
import toast, { Toaster } from "react-hot-toast";
const CreateWorkerOrderPage = () => {
  const [wantsAssets, setWantsAssets] = useState(false);
  const [wantsMechanics, setWantsMechanics] = useState(false);
  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: () => getAssets(),
    enabled: !!wantsAssets,
  });

  const { data: mechanics, isLoading: mechanicsLoading } = useQuery({
    queryKey: ["mecahnics"],
    queryFn: () => getAllMechanics(),
    enabled: !!wantsMechanics,
  });
  console.log(mechanics);
  //formfields
  const [asset, SetAsset] = useState(null);
  const [mechanic, setMechanic] = useState(0);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [photos, setPhotos] = useState([]);
  const requestor = "sdrozd";
  //handlers
  const handleChooseAsset = (e) => {
    SetAsset(e.target.value);
  };

  const handleChooseMechanic = (e) => {
    console.log("This is mechanic", e.target.value);
    setMechanic(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDueDateChange = (e) => {
    console.log(e.target.value)
    setDueDate(e.target.value);
  }

  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...selectedFiles]);
    console.log(photos);
  };
  const handleSubmit = () => {
    const data = {
      asset,
      mechanic,
      description,
      priority,
      dueDate,
    };
    const formData = new FormData();
    formData.append("asset", asset);
    formData.append("mechanic", mechanic);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("dueDate", dueDate);
    formData.append("requestor", requestor);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    saveMutation.mutate(formData);
  };

  const saveMutation = useMutation({
    mutationFn: (data) => saveWorkOrder(data),
    onSuccess: (data) => {
       toast.success("Work Order Created successfully");
    },
    onError: (err) => {
     toast.error("There was an error saving this work order");
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerIcon}>
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 className={styles.title}>Create Work Order</h1>
            <p className={styles.subtitle}>
              Add a new task, assign ownership, and set the urgency level.
            </p>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Work Order Details</h2>
            <p className={styles.sectionText}>
              Fill out the information below to create a new maintenance
              request.
            </p>
          </div>

          <form className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                <Wrench size={16} />
                Asset
              </label>
              <select
                onChange={handleChooseAsset}
                onClick={() => setWantsAssets(true)}
                className={styles.inputField}
              >
                {assets &&
                  assets.map((asset) => (
                    <option value={asset.compid}>{asset.comp_desc}</option>
                  ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <User size={16} />
                Assign To
              </label>
              <select
                onChange={handleChooseMechanic}
                onClick={() => setWantsMechanics(true)}
                className={styles.inputField}
              >
                {mechanics &&
                  mechanics.map((mechanic) => (
                    <option value={mechanic.id}>
                      {mechanic.firstName + " " + mechanic.lastname}
                    </option>
                  ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <ClipboardList size={16} />
                Task Description
              </label>
              <textarea
                onChange={handleDescriptionChange}
                value={description}
                className={`${styles.inputField} ${styles.textareaField}`}
                placeholder="Describe the issue, requested work, or maintenance task..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <AlertCircle size={16} />
                Priority
              </label>
              <select
                onChange={handlePriorityChange}
                className={styles.inputField}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <CalendarDays size={16} />
                Due Date
              </label>
              <input
                onChange={handleDueDateChange}
                type="date"
                className={styles.inputField}
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <ImagePlus size={16} />
                Photos
              </label>

              <div className={styles.photoUploadCard}>
                <div className={styles.photoUploadTop}>
                  <div className={styles.photoUploadIcon}>
                    <Upload size={18} />
                  </div>
                  <div>
                    <p className={styles.photoUploadTitle}>Upload photos</p>
                    <p className={styles.photoUploadText}>
                      Add photos of the issue, damaged area, or equipment for
                      reference.
                    </p>
                  </div>
                </div>

                <label htmlFor="photo-upload" className={styles.photoDropzone}>
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className={styles.hiddenFileInput}
                    onChange={handlePhotoChange}
                  />

                  <div className={styles.photoDropzoneInner}>
                    <div className={styles.photoDropzoneIcon}>
                      <ImagePlus size={22} />
                    </div>
                    <p className={styles.photoDropzoneTitle}>
                      Tap to upload or drop photos
                    </p>
                  </div>
                </label>

                <div className={styles.photoPreviewGrid}>
                  {photos.length > 0 &&
                    photos.map((photo, index) => (
                      <div key={index} className={styles.photoPreviewItem}>
                        <div className={styles.photoPreviewThumb}>IMG</div>
                        <div className={styles.photoPreviewMeta}>
                          <p className={styles.photoName}>{photo.name}</p>
                          <p className={styles.photoSize}></p>
                        </div>
                        <button
                          onClick={() => handleRemovePhoto(index)}
                          type="button"
                          className={styles.removePhotoBtn}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </form>

          <div className={styles.footer}>
            <div className={styles.helperText}>
              Make sure the task description is clear enough for the assigned
              mechanic.
            </div>
            <div className={styles.buttonRow}>
              <button type="button" className={styles.secondaryBtn}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className={styles.primaryBtn}
              >
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      </div>
       <Toaster position="bottom-right" />
      
    </div>
  );
};

export default CreateWorkerOrderPage;
