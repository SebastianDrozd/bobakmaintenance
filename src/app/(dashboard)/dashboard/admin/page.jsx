"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Search,
  Plus,
  Wrench,
  Shield,
  Pencil,
  X,
} from "lucide-react";
import styles from "../../../../styles/AdminPage.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMechanic, getAllMechanicsFull } from "@/api/mechanics";

const mockMechanics = [
  {
    id: 1,
    firstName: "Uriel ",
    lastName: "PerezPerez",
    username: "perez",
    role: "Mechanic",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Jonathon Perez",
    lastName: "Perez",
    username: "uperez",
    role: "Mechanic",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Mariusz",
    lastName: "Czyrek",
    username: "mrczyrek",
    role: "Supervisor",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Pawel",
    lastName: "Staroskta",
    username: "",
    role: "Mechanic",
    status: "Inactive",
  },
];

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [editing,setEditing] = useState(false)
   const [editableRowIndex,setEditableRowIndex] = useState(null);
  const {data : mechanics,isLoading,isError} = useQuery({
    queryKey : ["mechanics"],
    queryFn : getAllMechanicsFull
  })
  console.log("mechanics",mechanics)
  if(isLoading){
    return "loading..."
  }

  const wantsEditRow =(index) => {
    setEditableRowIndex(index);
    setEditing(true)
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
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {mechanics.map((mechanic,index) => (
                  <tr key={mechanic.Id} className={styles.tableRow}>
                    <td className={styles.cell}>
                      <div className={styles.userCell}>
                        {editableRowIndex == index && editing ? <input className={styles.inputField} placeholder="hello"/> : <span>
                          {mechanic.firstName} 
                        </span>}
                        
                      </div>
                    </td>
                    <td className={styles.cell}>
                    {editableRowIndex == index && editing ? <input className={styles.inputField}/> : mechanic.lastName }
                    </td>
                  
                   
                    

                    <td className={styles.cell}>
                      {editableRowIndex == index && editing ?  <input className={styles.inputField}/> : <span className={styles.rolePill}>
                        <Wrench size={14} />
                        {mechanic.department}
                      </span>}
                      
                    </td>

                    <td className={styles.cell}>
                      {editableRowIndex == index && editing ? <select><option>First</option></select> : <span
                        className={`${styles.badge} ${
                          mechanic.status === "Active"
                            ? styles.activeBadge
                            : styles.inactiveBadge
                        }`}
                      >
                        {mechanic.shift}
                      </span> }
                     
                    </td>
                   <td className={styles.cell}>{editableRowIndex == index && editing ? <input className={styles.inputField}/> : mechanic.notes}</td>
                    <td className={styles.cell}>
                      <button className={styles.iconActionBtn} onClick={() => wantsEditRow(index)}>
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
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

      {isModalOpen && <CreateMechanicModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const CreateMechanicModal = ({ onClose }) => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("");
  const [shift,setShift] = useState("");
  const [department,setDepartment] = useState("");
  const [notes,setNotes] = useState("")

  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      FirstName : firstName,
      LastName : lastName,
     
      Shift : shift,
      Department : department,
      Notes : notes
    }
    console.log(data)
    saveMutation.mutate(data)
  }

  const saveMutation = useMutation({
    mutationFn : (data) => createMechanic(data),
    onSuccess : (data) => {
      console.log(data)
      queryClient.invalidateQueries(["mechanics"])
      onClose()
    },
    onError : (err) => {
      onClose()
      console.log(err)
    }
  })

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

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <input onChange={(e) => setFirstName(e.target.value)} className={styles.modalInput} placeholder="Mike" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <input onChange={(e) => setLastName(e.target.value)} className={styles.modalInput} placeholder="Johnson" />
            </div>

            
            <div className={styles.formGroup}>
              <label className={styles.label}>Department</label>
              <input onChange={(e) => setDepartment(e.target.value)} className={styles.modalInput} placeholder="packging" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shift</label>
              <select value={shift} onChange={(e)=>setShift(e.target.value)} className={styles.modalInput}>
                <option value="">Select role</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
              </select>
            </div>

          

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes</label>
              <textarea
                onChange={e => setNotes(e.target.value)}
                className={styles.textarea}
                placeholder="Optional notes about the mechanic, role, or assignment responsibilities"
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.modalFooterText}>
              Additional admin features can be added to this page later.
            </div>

            <div className={styles.buttonRow}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className={styles.submitBtn}>
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