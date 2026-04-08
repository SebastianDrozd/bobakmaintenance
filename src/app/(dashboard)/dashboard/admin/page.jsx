"use client";

import { useState } from "react";
import { Plus, Wrench, Shield, Pencil, X, Check } from "lucide-react";
import styles from "../../../../styles/AdminPage.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMechanic,
  getAllMechanicsFull,
  updateMechanic, // make sure you create/export this in your api file
} from "@/api/mechanics";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draftRow, setDraftRow] = useState({
    firstName: "",
    lastName: "",
    department: "",
    shift: "",
    notes: "",
  });

  const queryClient = useQueryClient();

  const {
    data: mechanics = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mechanics"],
    queryFn: getAllMechanicsFull,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateMechanic(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mechanics"] });
      setEditingId(null);
      setDraftRow({
        firstName: "",
        lastName: "",
        department: "",
        shift: "",
        notes: "",
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const startEdit = (mechanic) => {
    setEditingId(mechanic.id);
    setDraftRow({
      firstName: mechanic.firstName || "",
      lastName: mechanic.lastName || "",
      department: mechanic.department || "",
      shift: mechanic.shift || "",
      notes: mechanic.notes || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftRow({
      firstName: "",
      lastName: "",
      department: "",
      shift: "",
      notes: "",
    });
  };

  const handleDraftChange = (field, value) => {
    setDraftRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (id) => {
    const payload = {
      FirstName: draftRow.firstName,
      LastName: draftRow.lastName,
      Department: draftRow.department,
      Shift: draftRow.shift,
      Notes: draftRow.notes,
    };

    updateMutation.mutate({
      id,
      data: payload,
    });
  };

  if (isLoading) {
    return <div className={styles.page}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.page}>Failed to load mechanics.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div>
              <p className={styles.eyebrow}>Administration</p>
              <h1 className={styles.title}>Admin Panel</h1>
              <p className={styles.subtitle}>
                Manage system settings and core maintenance users. Additional
                administrative tools can be added here over time.
              </p>
            </div>
          </div>

          <button
            className={styles.primaryBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Add Mechanic
          </button>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Mechanics</h2>
              <p className={styles.sectionText}>
                Add and maintain the list of mechanics available in the system.
              </p>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr className={styles.tableHeaders}>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Department</th>
                  <th>Shift</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {mechanics.map((mechanic) => {
                  const isEditing = editingId === mechanic.id;

                  return (
                    <tr key={mechanic.id} className={styles.tableRow}>
                      <td className={styles.cell}>
                        <div className={styles.userCell}>
                          {isEditing ? (
                            <input
                              className={styles.inputField}
                              value={draftRow.firstName}
                              onChange={(e) =>
                                handleDraftChange("firstName", e.target.value)
                              }
                            />
                          ) : (
                            <span>{mechanic.firstName}</span>
                          )}
                        </div>
                      </td>

                      <td className={styles.cell}>
                        {isEditing ? (
                          <input
                            className={styles.inputField}
                            value={draftRow.lastName}
                            onChange={(e) =>
                              handleDraftChange("lastName", e.target.value)
                            }
                          />
                        ) : (
                          mechanic.lastName
                        )}
                      </td>

                      <td className={styles.cell}>
                        {isEditing ? (
                          <input
                            className={styles.inputField}
                            value={draftRow.department}
                            onChange={(e) =>
                              handleDraftChange("department", e.target.value)
                            }
                          />
                        ) : (
                          <span className={styles.rolePill}>
                            <Wrench size={14} />
                            {mechanic.department}
                          </span>
                        )}
                      </td>

                      <td className={styles.cell}>
                        {isEditing ? (
                          <select
                            className={styles.inputField}
                            value={draftRow.shift}
                            onChange={(e) =>
                              handleDraftChange("shift", e.target.value)
                            }
                          >
                            <option value="">Select shift</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                          </select>
                        ) : (
                          <span className={styles.badge}>
                            {mechanic.shift || "-"}
                          </span>
                        )}
                      </td>

                      <td className={styles.cell}>
                        {isEditing ? (
                          <input
                            className={styles.inputField}
                            value={draftRow.notes}
                            onChange={(e) =>
                              handleDraftChange("notes", e.target.value)
                            }
                          />
                        ) : (
                          mechanic.notes || "-"
                        )}
                      </td>

                      <td className={styles.cell}>
                        <div className={styles.actionGroup}>
                          {isEditing ? (
                            <>
                              <button
                                className={styles.saveBtn}
                                onClick={() => handleSave(mechanic.id)}
                                disabled={updateMutation.isPending}
                                type="button"
                              >
                                <Check size={15} />
                              </button>

                              <button
                                className={styles.cancelIconBtn}
                                onClick={cancelEdit}
                                type="button"
                              >
                                <X size={15} />
                              </button>
                            </>
                          ) : (
                            <button
                              className={styles.iconActionBtn}
                              onClick={() => startEdit(mechanic)}
                              type="button"
                            >
                              <Pencil size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.footerNote}>
            <div className={styles.footerIcon}>
              <Shield size={16} />
            </div>
            <p className={styles.footerText}>
              More administrative tools can be added here later, such as roles,
              permissions, departments, and asset configuration settings.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateMechanicModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const CreateMechanicModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: (data) => createMechanic(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mechanics"] });
      onClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      FirstName: firstName,
      LastName: lastName,
      Shift: shift,
      Department: department,
      Notes: notes,
    };

    saveMutation.mutate(data);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Administration</p>
            <h2 className={styles.modalTitle}>Add Mechanic</h2>
            <p className={styles.modalSubtitle}>
              Create a new mechanic record for assignment and tracking.
            </p>
          </div>

          <button className={styles.closeBtn} onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.modalInput}
                placeholder="Mike"
                value={firstName}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                className={styles.modalInput}
                placeholder="Johnson"
                value={lastName}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Department</label>
              <input
                onChange={(e) => setDepartment(e.target.value)}
                className={styles.modalInput}
                placeholder="Packaging"
                value={department}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className={styles.modalInput}
              >
                <option value="">Select shift</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes</label>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                className={styles.textarea}
                placeholder="Optional notes about the mechanic, role, or assignment responsibilities"
                value={notes}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.modalFooterText}>
              Additional admin features can be added to this page later.
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Save Mechanic
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;