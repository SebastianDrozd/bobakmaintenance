"use client";

import {
  Factory,
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  MapPin,
  Wrench,
  Camera,
  FileText,
  Edit,
  X,
  Upload,
} from "lucide-react";
import Image from "next/image";
import styles from "../../../../../styles/ViewAssetPage.module.css";
import { deleteAsset, getAssetById, updateAsset } from "@/api/assets";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/util/AuthProvider";

const IMAGE_BASE = "http://sebastian.bobak.local:5159/uploads/assets/";

const ViewAssetPage = () => {
  const params = useParams();
  const assetId = params.id;
  const queryClient = useQueryClient();
  const [wantsEdit, setWantsEdit] = useState(false);
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model_no, setModel_no] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [purchase_date, setPurchase_date] = useState("");
  const [install_date, setInstall_date] = useState("");
  const [last_service_date, setLast_service_date] = useState("");
  const [next_service_date, setNext_service_date] = useState("");
  const [full_desc, setFull_desc] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const auth = useContext(AuthContext)
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => getAssetById(assetId),
    enabled: !!assetId,
  });

  useEffect(() => {
    if (data) {
      setExistingImages(data.images || []);
      setRemovedImageIds([]);
      setNewFiles([]);

      setStatus(data.asset.status || "");
      setDepartment(data.asset.department || "");
      setManufacturer(data.asset.manufacturer || "");
      setModel_no(data.asset.model_no || "");
      setSerial_no(data.asset.serial_no || "");
      setPurchase_date(data.asset.purchase_date || "");
      setInstall_date(data.asset.install_date || "");
      setLast_service_date(data.asset.last_service_date || "");
      setNext_service_date(data.asset.next_service_date || "");
      setFull_desc(data.asset.full_desc || "");
    }
  }, [data]);

  const visibleExistingImages = existingImages.filter(
    (img) => !removedImageIds.includes(img.photo_id)
  );

  const newFilePreviews = useMemo(() => {
    return newFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
  }, [newFiles]);

  useEffect(() => {
    return () => {
      newFilePreviews.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [newFilePreviews]);

  const handleRemoveExistingImage = (imageId) => {
    setRemovedImageIds((prev) =>
      prev.includes(imageId) ? prev : [...prev, imageId]
    );
  };

  const handleUndoRemoveExistingImage = (imageId) => {
    setRemovedImageIds((prev) => prev.filter((id) => id !== imageId));
  };

  const handleNewFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleRemoveNewFile = (indexToRemove) => {
    setNewFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const resetFormFromData = () => {
    if (!data) return;

    setExistingImages(data.images || []);
    setRemovedImageIds([]);
    setNewFiles([]);

    setStatus(data.asset.status || "");
    setDepartment(data.asset.department || "");
    setManufacturer(data.asset.manufacturer || "");
    setModel_no(data.asset.model_no || "");
    setSerial_no(data.asset.serial_no || "");
    setPurchase_date(data.asset.purchase_date || "");
    setInstall_date(data.asset.install_date || "");
    setLast_service_date(data.asset.last_service_date || "");
    setNext_service_date(data.asset.next_service_date || "");
    setFull_desc(data.asset.full_desc || "");
  };

  const handleToggleEdit = () => {
    if (wantsEdit) {
      resetFormFromData();
      setWantsEdit(false);
      return;
    }

    setWantsEdit(true);
  };

  const handleUpdateBtn = async () => {

    const formData = new FormData();

    formData.append("status", status);
    formData.append("department", department);
    formData.append("manufacturer", manufacturer);
    formData.append("model_no", model_no);
    formData.append("serial_no", serial_no);
    formData.append("purchase_date", purchase_date || "");
    formData.append("install_date", install_date || "");
    formData.append("last_service_date", last_service_date || "");
    formData.append("next_service_date", next_service_date || "");
    formData.append("full_desc", full_desc || "");
    formData.append("UpdatedBy", auth?.user.username); // replace with actual user info from context/auth
    removedImageIds.forEach((id) => {
      formData.append("removedImageIds", id.toString());
    });

    newFiles.forEach((file) => {
      formData.append("newImages", file);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // replace this with your real api call
    updateMutation.mutate(formData);
  };

  const updateMutation = useMutation({
    mutationFn: (updatedAsset) => updateAsset(assetId, updatedAsset),
    onSuccess: () => {
      // Invalidate and refetch asset details after successful update
      queryClient.invalidateQueries({ queryKey: ["asset", assetId] });
      setWantsEdit(false);
      toast.success("Asset updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update asset:", error);
      toast.error("Failed to update asset. Please try again.");
    },
  })
  const deleteMutation = useMutation({
    mutationFn: () => deleteAsset(assetId),
    onSuccess: () => {
      toast.success("Asset deleted successfully!");
      router.push("/dashboard/assets");
    },
    onError: (error) => {
      console.error("Failed to delete asset:", error);
      toast.error("Failed to delete asset. Please try again.");
    },
  });

  const formatDateForInput = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  const currentStatus = wantsEdit ? status : data?.asset?.status;
  const handleDeleteBtn = () => {
    if (confirm("Are you sure you want to delete this asset?")) {
      deleteMutation.mutate();
    }
  };
  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading asset details.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerLeft}>


            <div>
              <p className={styles.eyebrow}>Assets</p>
              <h1 className={styles.title}>{data.asset.comp_desc}</h1>
              <p className={styles.subtitle}>
                Review asset details, service information, and related photos.
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <div
              className={`${styles.statusPill} ${currentStatus === "Active"
                ? styles.activeBadge
                : currentStatus === "Maintenance"
                  ? styles.maintenanceBadge
                  : styles.inactiveBadge
                }`}
            >
              {currentStatus || "Unknown"}
            </div>
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.headerRow}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.sectionText}>
                Core asset information and operational details.
              </p>
            </div>

            <div className={styles.btnRow}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={handleToggleEdit}
              >
                <Edit size={16} />
              </button>

              {wantsEdit && (
                <button onClick={handleUpdateBtn} className={styles.updateBtn}>
                  Update
                </button>
              )}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FileText size={16} />
                Asset Code
              </div>
              <div className={styles.infoValue}>{data.asset.compid}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <BadgeCheck size={16} />
                Status
              </div>
              {wantsEdit ? (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.inputField}
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <div className={styles.infoValue}>{data.asset.status}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <MapPin size={16} />
                Department
              </div>
              {wantsEdit ? (
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <div className={styles.infoValue}>{data.asset.department}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Factory size={16} />
                Manufacturer
              </div>
              {wantsEdit ? (
                <input
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <div className={styles.infoValue}>{data.asset.manufacturer}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Wrench size={16} />
                Model
              </div>
              {wantsEdit ? (
                <input
                  value={model_no}
                  onChange={(e) => setModel_no(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <div className={styles.infoValue}>{data.asset.model_no}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <ClipboardList size={16} />
                Serial Number
              </div>
              {wantsEdit ? (
                <input
                  value={serial_no}
                  onChange={(e) => setSerial_no(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <div className={styles.infoValue}>{data.asset.serial_no}</div>
              )}
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Purchase Date
              </div>
              <div className={styles.infoValue}>
                {wantsEdit ? (
                  <input
                    type="date"
                    value={formatDateForInput(purchase_date)}
                    onChange={(e) => setPurchase_date(e.target.value)}
                    className={styles.inputField}
                  />
                ) : (
                  <p>
                    {data.asset.purchase_date
                      ? new Date(data.asset.purchase_date).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Install Date
              </div>
              <div className={styles.infoValue}>
                {wantsEdit ? (
                  <input
                    type="date"
                    value={formatDateForInput(install_date)}
                    onChange={(e) => setInstall_date(e.target.value)}
                    className={styles.inputField}
                  />
                ) : (
                  <p>
                    {data.asset.install_date
                      ? new Date(data.asset.install_date).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Last Service Date
              </div>
              <div className={styles.infoValue}>
                {wantsEdit ? (
                  <input
                    type="date"
                    value={formatDateForInput(last_service_date)}
                    onChange={(e) => setLast_service_date(e.target.value)}
                    className={styles.inputField}
                  />
                ) : (
                  <p>
                    {data.asset.last_service_date
                      ? new Date(data.asset.last_service_date).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <CalendarDays size={16} />
                Next Service Date
              </div>
              <div className={styles.infoValue}>
                {wantsEdit ? (
                  <input
                    type="date"
                    value={formatDateForInput(next_service_date)}
                    onChange={(e) => setNext_service_date(e.target.value)}
                    className={styles.inputField}
                  />
                ) : (
                  <p>
                    {data.asset.next_service_date
                      ? new Date(data.asset.next_service_date).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
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

              {wantsEdit ? (
                <textarea
                  value={full_desc}
                  onChange={(e) => setFull_desc(e.target.value)}
                  className={styles.inputField}
                />
              ) : (
                <div className={styles.descriptionCard}>
                  {data.asset.full_desc ? data.asset.full_desc : "N/A"}
                </div>
              )}
            </div>

            <div className={styles.block}>
              <div className={styles.blockLabel}>
                <Camera size={16} />
                Photos
              </div>

              {wantsEdit && (
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="asset-photo-upload"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                    className={styles.secondaryBtn}
                  >
                    <Upload size={16} />
                    Add Photos
                  </label>

                  <input
                    id="asset-photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewFilesChange}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              <div className={styles.photoGrid}>
                {visibleExistingImages.map((photo) => (
                  <div key={photo.photo_id} className={styles.photoCard}>
                    <div
                      className={styles.photoImageWrap}
                      style={{ position: "relative" }}
                    >
                      <Image
                        unoptimized
                        src={IMAGE_BASE + photo.photo_path}
                        fill
                        className={styles.photoImage}
                        alt={photo.name || "Asset photo"}
                      />

                      {wantsEdit && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(photo.photo_id)}
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            border: "none",
                            borderRadius: "999px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: "rgba(0,0,0,0.65)",
                            color: "#fff",
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <div className={styles.photoMeta}>
                      <p className={styles.photoName}>{photo.name}</p>
                      <p className={styles.photoHint}>Saved asset photo</p>
                    </div>
                  </div>
                ))}

                {newFilePreviews.map((item, index) => (
                  <div
                    key={`${item.file.name}-${index}`}
                    className={styles.photoCard}
                  >
                    <div
                      className={styles.photoImageWrap}
                      style={{ position: "relative" }}
                    >
                      <Image
                        unoptimized
                        src={item.previewUrl}
                        fill
                        className={styles.photoImage}
                        alt={item.file.name || "New upload"}
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveNewFile(index)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          border: "none",
                          borderRadius: "999px",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          background: "rgba(0,0,0,0.65)",
                          color: "#fff",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className={styles.photoMeta}>
                      <p className={styles.photoName}>{item.file.name}</p>
                      <p className={styles.photoHint}>New photo to upload</p>
                    </div>
                  </div>
                ))}
              </div>

              {wantsEdit && removedImageIds.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <p style={{ marginBottom: "8px", fontWeight: 600 }}>
                    Marked for removal
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {existingImages
                      .filter((img) => removedImageIds.includes(img.photo_id))
                      .map((img) => (
                        <button
                          key={img.photo_id}
                          type="button"
                          onClick={() => handleUndoRemoveExistingImage(img.photo_id)}
                          className={styles.secondaryBtn}
                        >
                          Undo remove: {img.photo_path}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.footer}>
              <div className={styles.helperText}>
                
              </div>

              <div className={styles.buttonRow}>
                <button type="button" className={styles.secondaryBtn} onClick={() => router.back()}>
                  Back
                </button>
                <button type="button" className={styles.deleteBtn} onClick={handleDeleteBtn}>
                  Delete Asset
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
      <Toaster position="bottom-right" />

    </div>
  );
};

export default ViewAssetPage;