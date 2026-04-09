"use client";

import { useContext, useEffect, useState } from "react";
import {
  Factory,
  Plus,
  Search,
  SlidersHorizontal,
  Filter,
  Wrench,
  MapPin,
  ShieldCheck,
  X,
  RefreshCwIcon,
  FilterIcon,
  ImagePlus,
  Upload,
} from "lucide-react";
import styles from "../../../../styles/AssetsPage.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewAsset, getAssets, getAssetsQuery, getFullAssets } from "@/api/assets";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/util/AuthProvider";

const AssetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("comp_desc");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [pageButtons, setPageButtons] = useState([]);
  const router = useRouter();
  const { data: assets } = useQuery({
    queryKey: [
      "assets",
      page,
      pageSize,
      sortBy,
      sortDirection,
      searchTerm,
      status,
    ],
    queryFn: () =>
      getAssetsQuery(page, pageSize, sortBy, sortDirection, searchTerm, status),
  });

  console.log(assets);

  const handleSortByClick = (field) => {
    setSortBy(field);
    console.log("this is sort by " + field);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setStatus("");
  };


 
  useEffect(() => {
   if(assets?.totalPages) {
    const buttons = [];
    for(let i = page; i < page + 5 && i <= assets.totalPages; i++) {
      buttons.push(i);
    }
    setPageButtons(buttons);
   }
  }, [assets]);
  


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div>
            <p className={styles.eyebrow}>Maintenance</p>
            <h1 className={styles.title}>Assets</h1>
            <p className={styles.subtitle}>
              View, search, and manage plant assets used across maintenance
              operations.
            </p>
          </div>

          <button
            className={styles.primaryBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            New Asset
          </button>
        </div>

        <div className={styles.controlsCard}>
          <div className={styles.controlsTopRow}>
            <div className={styles.searchInputWrap}>
              <Search size={16} />
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className={styles.inputField}
                placeholder="Search by asset name, code, department, or type"
              />
            </div>

            <div className={styles.actionsRow}>
              <div className={styles.selectWrap}>
                <FilterIcon size={16} className={styles.selectIcon} />

                <select
                  className={styles.statusBtn}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <button onClick={clearSearch} className={styles.secondaryBtn}>
                <RefreshCwIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div className={styles.headerRow}>
              <div>
                <h3 className={styles.tableTitle}>Asset Registry</h3>
                <p className={styles.tableSubtitle}>
                  Master list of tracked maintenance assets.
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
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.assetsTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th
                    className={styles.fixedCol}
                    onClick={() => handleSortByClick("comp_desc")}
                  >
                    Asset
                  </th>
                  <th onClick={() => handleSortByClick("compid")}>
                    Asset Code
                  </th>
                  <th onClick={() => handleSortByClick("department")}>
                    Department
                  </th>
                  <th onClick={() => handleSortByClick("line_no")}>Line No</th>
                  <th onClick={() => handleSortByClick("status")}>Status</th>
                  <th onClick={() => handleSortByClick("manufacturer")}>
                    Manufacturer
                  </th>
                </tr>
              </thead>

              <tbody>
                {assets?.items?.map((asset) => (
                  <tr key={asset.id} className={`${styles.tableRow}`} onClick={() => {router.push(`/dashboard/assets/${asset.compid}`)}}>
                    <td className={`${styles.cell} ${styles.fixedCol}`}>
                      <div className={styles.assetNameWrap}>
                        <div className={styles.assetIcon}>
                          <Factory size={15} />
                        </div>
                        <span>{asset.comp_desc}</span>
                      </div>
                    </td>

                    <td className={styles.cell}>{asset.compid}</td>

                    <td className={styles.cell}>
                      <span className={styles.inlineMeta}>
                        <MapPin size={14} />
                        {asset.department}
                      </span>
                    </td>

                    <td className={styles.cell}>
                      <span className={styles.typePill}>{asset.line_no}</span>
                    </td>

                    <td className={styles.cell}>
                      <span
                        className={`${styles.badge} ${
                          asset.status === "Active"
                            ? styles.activeBadge
                            : asset.status === "Inactive"
                              ? styles.inactiveBadge
                              : styles.maintenanceBadge
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    <td className={styles.cell}>{asset.manufacturer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationBar}>
            <div className={styles.paginationInfo}>
              Showing{" "}
              <strong>
                {assets?.items?.length > 0 ? (page - 1) * pageSize + 1 : 0}–
                {Math.min(page * pageSize, assets?.totalCount)}
              </strong>{" "}
              of <strong>{assets?.totalCount}</strong> assets
            </div>

            <div className={styles.paginationControls}>
              {assets?.hasPreviousPage && (
                <button
                  onClick={() => setPage((prev) => prev - 1)}
                  className={styles.pageBtn}
                >
                  Previous
                </button>
              )}
              {pageButtons.map((btnPage) => (
                <button
                  key={btnPage}
                  onClick={() => setPage(btnPage)}
                  className={`${styles.pageNumber} ${page === btnPage ? styles.pageNumberActive : ""}`}
                >
                  {btnPage}
                </button>
              ))}
              {assets?.hasNextPage && (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className={styles.pageBtn}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateAssetModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const CreateAssetModal = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [line_no, setLine_no] = useState("");
  const [department, setDepartment] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model_no, setModel_no] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [status, setStatus] = useState("Active");
  const [photos, setPhotos] = useState([]);
  const [serviceDate, setServiceDate] = useState("");
  const auth = useContext(AuthContext);
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("comp_desc", description);
    formData.append("line_no", line_no);
    formData.append("department", department);
    formData.append("manufacturer", manufacturer);
    formData.append("model_no", model_no);
    formData.append("serial_no", serial_no);
    formData.append("status", status);
    formData.append("service_date", serviceDate);
    formData.append("CreatedBy", auth?.user.username); // replace with actual user info from context/auth

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    console.log("ready to submit", {
      description,
      line_no,
      department,
      manufacturer,
      model_no,
      serial_no,
      status,
      serviceDate,
      photos,
    });

    saveMutation.mutate(formData);
  };

  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setPhotos((prev) => [...prev, ...selectedFiles]);

    // allows selecting the same file again later if needed
    e.target.value = "";
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };


  const saveMutation = useMutation({
    mutationFn : (data) => createNewAsset(data),
    onSuccess: (data) => {
       setDescription("");
      setLine_no("");
      setDepartment("");
      setManufacturer("");
      setModel_no("");
      setSerial_no("");
      setStatus("Active");
      setPhotos([]);
      setServiceDate("");
      onClose()
    },
    onError : (data) => {
      console.log(data)
    }
  })

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Assets</p>
            <h2 className={styles.modalTitle}>Create New Asset</h2>
            <p className={styles.modalSubtitle}>
              Add a new asset to the maintenance registry.
            </p>
          </div>

          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSave}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Asset</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Line Number</label>
                <input
                  value={line_no}
                  onChange={(e) => setLine_no(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Department</label>
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Manufacturer</label>
                <input
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Model Number</label>
                <input
                  value={model_no}
                  onChange={(e) => setModel_no(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Serial Number</label>
                <input
                  value={serial_no}
                  onChange={(e) => setSerial_no(e.target.value)}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.modalInput}
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Last Service Date</label>
                <input
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  type="date"
                  className={styles.modalInput}
                />
              </div>
            </div>

            <div className={styles.photoUploadCard}>
              <div className={styles.photoUploadTop}>
                <div className={styles.photoUploadIcon}>
                  <Upload size={18} />
                </div>
                <div>
                  <p className={styles.photoUploadTitle}>Upload photos</p>
                  <p className={styles.photoUploadText}>
                    Add photos of the asset, damaged area, or equipment for
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
                    <div key={`${photo.name}-${index}`} className={styles.photoPreviewItem}>
                      <div className={styles.photoPreviewThumb}>IMG</div>

                      <div className={styles.photoPreviewMeta}>
                        <p className={styles.photoName}>{photo.name}</p>
                        <p className={styles.photoSize}>
                          {formatFileSize(photo.size)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className={styles.removePhotoBtn}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.footerText}>
              Asset details can be edited later after creation.
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button onClick={handleSave} type="submit" className={styles.submitBtn}>
                Create Asset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AssetsPage;
