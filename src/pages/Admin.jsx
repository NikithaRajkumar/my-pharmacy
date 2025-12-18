import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { medicineAPI, authAPI } from "../services/api";

const Admin = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    price: "",
    description: "",
    category: "Pain Relief",
    quantity: 1,
    image: ""
  });

  useEffect(() => {
    if (!isLoggedIn() || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    loadUsers();
    loadMedicines();
  }, [isLoggedIn, user, navigate]);

  const loadUsers = async () => {
    try {
      const data = await authAPI.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const loadMedicines = async () => {
    try {
      const data = await medicineAPI.getAll();
      setMedicines(data);
    } catch (error) {
      console.error("Error loading medicines:", error);
    }
  };

  const generateDefaultMedicines = () => {
    const categories = ["Pain Relief", "Antibiotics", "Vitamins"];
    const sampleMeds = [
      {
        name: "Aspirin",
        desc: "Pain reliever and anti-inflammatory",
        category: "Pain Relief",
      },
      {
        name: "Amoxicillin",
        desc: "Broad-spectrum antibiotic",
        category: "Antibiotics",
      },
      {
        name: "Vitamin C",
        desc: "Immune system booster",
        category: "Vitamins",
      },
    ];

    return sampleMeds.map((med, index) => ({
      id: index + 1,
      name: med.name,
      price: Math.floor(Math.random() * 400 + 50),
      description: med.desc,
      category: med.category,
      image: `/images/${med.name.toLowerCase()}.jpg`,
    }));
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const medicine = await medicineAPI.create(newMedicine);
      setMedicines([...medicines, medicine]);
      setNewMedicine({
        name: "",
        price: "",
        description: "",
        category: "Pain Relief",
        quantity: 1,
        image: ""
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert('Error adding medicine: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateMedicine = async (e) => {
    e.preventDefault();
    try {
      const updated = await medicineAPI.update(
        editingMedicine._id,
        editingMedicine
      );
      setMedicines(medicines.map((m) => (m._id === updated._id ? updated : m)));
      setEditingMedicine(null);
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  const handleDeleteMedicine = async (id) => {
    try {
      await medicineAPI.delete(id);
      setMedicines(medicines.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const styles = `
    .admin-page {
      min-height: 100vh;
      background: #f8fafc;
    }
    .admin-header {
      background: white;
      padding: 2rem;
      border-bottom: 1px solid #e2e8f0;
      text-align: center;
    }
    .admin-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }
    .admin-subtitle {
      font-size: 1rem;
      color: #64748b;
    }
    .admin-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-weight: 500;
      color: #64748b;
      transition: all 0.2s ease;
    }
    .tab.active {
      color: #1e293b;
      border-bottom-color: #1e293b;
    }
    .tab-content {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
    }
    .users-table, .medicines-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .users-table th, .users-table td,
    .medicines-table th, .medicines-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    .users-table th, .medicines-table th {
      background: #f8fafc;
      font-weight: 500;
      color: #374151;
    }
    .form-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 6px;
    }
    .form-title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      margin-bottom: 0.25rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }
    .form-group input, .form-group select, .form-group textarea {
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 60px;
    }
    .btn {
      background: #1e293b;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    .btn:hover {
      background: #334155;
    }
    .btn-danger {
      background: #ef4444;
    }
    .btn-danger:hover {
      background: #dc2626;
    }
    .btn-edit {
      background: #059669;
      margin-right: 0.5rem;
    }
    .btn-edit:hover {
      background: #047857;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    @media (max-width: 768px) {
      .admin-content {
        padding: 1rem;
      }
      .tab-content {
        padding: 1rem;
      }
      .form-grid {
        grid-template-columns: 1fr;
      }
      .users-table, .medicines-table {
        font-size: 0.875rem;
      }
      .users-table th, .users-table td,
      .medicines-table th, .medicines-table td {
        padding: 0.5rem;
      }
    }
  `;

  if (!isLoggedIn() || user?.role !== "admin") {
    return null;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="admin-page">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage users and medicines</p>
        </div>
        <div className="admin-content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users ({users.length})
            </button>
            <button
              className={`tab ${activeTab === "medicines" ? "active" : ""}`}
              onClick={() => setActiveTab("medicines")}
            >
              Medicines ({medicines.length})
            </button>
          </div>

          {activeTab === "users" && (
            <div className="tab-content">
              <h2 className="form-title">Registered Users</h2>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString() || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "medicines" && (
            <div className="tab-content">
              <div className="form-section">
                <h2 className="form-title">Add New Medicine</h2>
                <form onSubmit={handleAddMedicine}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={newMedicine.name}
                        onChange={(e) =>
                          setNewMedicine({
                            ...newMedicine,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        value={newMedicine.price}
                        onChange={(e) =>
                          setNewMedicine({
                            ...newMedicine,
                            price: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={newMedicine.category}
                        onChange={(e) =>
                          setNewMedicine({
                            ...newMedicine,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Antibiotics">Antibiotics</option>
                        <option value="Vitamins">Vitamins</option>
                        <option value="Cough & Cold">Cough & Cold</option>
                        <option value="Digestive Health">Digestive Health</option>
                        <option value="First Aid">First Aid</option>
                        <option value="Eye Care">Eye Care</option>
                        <option value="Skin Care">Skin Care</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={newMedicine.quantity}
                        onChange={(e) =>
                          setNewMedicine({
                            ...newMedicine,
                            quantity: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Medicine Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      key={newMedicine.name}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert('Image size should be less than 5MB');
                            return;
                          }
                          
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          const img = new Image();
                          
                          img.onload = () => {
                            const maxWidth = 300;
                            const maxHeight = 300;
                            let { width, height } = img;
                            
                            if (width > height) {
                              if (width > maxWidth) {
                                height = (height * maxWidth) / width;
                                width = maxWidth;
                              }
                            } else {
                              if (height > maxHeight) {
                                width = (width * maxHeight) / height;
                                height = maxHeight;
                              }
                            }
                            
                            canvas.width = width;
                            canvas.height = height;
                            
                            ctx.drawImage(img, 0, 0, width, height);
                            const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
                            
                            setNewMedicine({
                              ...newMedicine,
                              image: compressedImage
                            });
                          };
                          
                          img.src = URL.createObjectURL(file);
                        }
                      }}
                    />
                    {newMedicine.image && (
                      <div style={{marginTop: '0.5rem'}}>
                        <img 
                          src={newMedicine.image} 
                          alt="Preview" 
                          style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px'}}
                        />
                        <button 
                          type="button" 
                          onClick={() => setNewMedicine({...newMedicine, image: ''})} 
                          style={{marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newMedicine.description}
                      onChange={(e) =>
                        setNewMedicine({
                          ...newMedicine,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    Add Medicine
                  </button>
                </form>
              </div>

              <h2 className="form-title">Manage Medicines</h2>
              <table className="medicines-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine) => (
                    <>
                      <tr key={medicine._id}>
                        <td>{medicine.name}</td>
                        <td>₹{medicine.price}</td>
                        <td>{medicine.category}</td>
                        <td>{medicine.quantity || 1}</td>
                        <td>{medicine.description}</td>
                        <td>
                          <div className="actions">
                            <button
                              className="btn btn-edit"
                              onClick={() => setEditingMedicine(editingMedicine?._id === medicine._id ? null : medicine)}
                            >
                              {editingMedicine?._id === medicine._id ? 'Cancel' : 'Edit'}
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteMedicine(medicine._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {editingMedicine?._id === medicine._id && (
                        <tr>
                          <td colSpan="6">
                            <form onSubmit={handleUpdateMedicine} style={{padding: '1rem', background: '#f8fafc'}}>
                              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem'}}>
                                <div>
                                  <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Name</label>
                                  <input
                                    type="text"
                                    value={editingMedicine.name}
                                    onChange={(e) => setEditingMedicine({...editingMedicine, name: e.target.value})}
                                    style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem'}}
                                    required
                                  />
                                </div>
                                <div>
                                  <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Price (₹)</label>
                                  <input
                                    type="number"
                                    value={editingMedicine.price}
                                    onChange={(e) => setEditingMedicine({...editingMedicine, price: e.target.value})}
                                    style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem'}}
                                    required
                                  />
                                </div>
                                <div>
                                  <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Category</label>
                                  <select
                                    value={editingMedicine.category}
                                    onChange={(e) => setEditingMedicine({...editingMedicine, category: e.target.value})}
                                    style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem'}}
                                  >
                                    <option value="Pain Relief">Pain Relief</option>
                                    <option value="Antibiotics">Antibiotics</option>
                                    <option value="Vitamins">Vitamins</option>
                                    <option value="Cough & Cold">Cough & Cold</option>
                                    <option value="Digestive Health">Digestive Health</option>
                                    <option value="First Aid">First Aid</option>
                                    <option value="Eye Care">Eye Care</option>
                                    <option value="Skin Care">Skin Care</option>
                                  </select>
                                </div>
                                <div>
                                  <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Quantity</label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={editingMedicine.quantity || 1}
                                    onChange={(e) => setEditingMedicine({...editingMedicine, quantity: e.target.value})}
                                    style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem'}}
                                    required
                                  />
                                </div>
                              </div>
                              <div style={{marginBottom: '1rem'}}>
                                <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Medicine Image</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setEditingMedicine({
                                          ...editingMedicine,
                                          image: event.target.result
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem'}}
                                />
                                {editingMedicine.image && (
                                  <img 
                                    src={editingMedicine.image} 
                                    alt="Preview" 
                                    style={{width: '80px', height: '80px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '4px'}}
                                  />
                                )}
                              </div>
                              <div style={{marginBottom: '1rem'}}>
                                <label style={{display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem'}}>Description</label>
                                <textarea
                                  value={editingMedicine.description}
                                  onChange={(e) => setEditingMedicine({...editingMedicine, description: e.target.value})}
                                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem', minHeight: '60px', resize: 'vertical'}}
                                  required
                                />
                              </div>
                              <div style={{display: 'flex', gap: '0.5rem'}}>
                                <button type="submit" className="btn">Update Medicine</button>
                                <button type="button" className="btn btn-danger" onClick={() => setEditingMedicine(null)}>Cancel</button>
                              </div>
                            </form>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>


            </div>
          )}
        </div>
      </div>
      <Alert
        isOpen={alert.isOpen}
        onClose={hideAlert}
        onConfirm={alert.onConfirm}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        variant={alert.variant}
      />
    </>
  );
};

export default Admin;
