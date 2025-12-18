import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { medicineAPI } from "../services/api";
import { useAlert } from "../hooks/useAlert";
import Alert from "../components/Alert";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const { addToCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { alert, showSuccess, showWarning, hideAlert } = useAlert();

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await medicineAPI.getAll();
      setMedicines(data);
    } catch (error) {
      console.error('Error loading medicines:', error);
      // Fallback to default medicines if API fails
      const defaultMedicines = generateDefaultMedicines();
      setMedicines(defaultMedicines);
    }
  };

  const generateDefaultMedicines = () => {
    const categoryMedicines = {
      "Pain Relief": [
        { name: "Aspirin", desc: "Pain reliever and anti-inflammatory" },
        { name: "Ibuprofen", desc: "NSAID for pain and inflammation" },
        { name: "Paracetamol", desc: "Fever reducer and pain reliever" },
      ],
      Antibiotics: [
        { name: "Amoxicillin", desc: "Broad-spectrum antibiotic" },
        { name: "Azithromycin", desc: "Macrolide antibiotic" },
      ],
      Vitamins: [
        { name: "Vitamin C", desc: "Immune system booster" },
        { name: "Vitamin D", desc: "Bone health supplement" },
      ],
      "Cough & Cold": [
        { name: "Cough Syrup", desc: "Relieves cough symptoms" },
      ],
      "Digestive Health": [
        { name: "Probiotics", desc: "Gut health supplement" },
      ],
    };

    const medicineList = [];
    let id = 1;

    Object.entries(categoryMedicines).forEach(([category, meds]) => {
      meds.forEach((med) => {
        const price = (Math.random() * 450 + 50).toFixed(0);
        const imageName = med.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".jpg";
        const image = `/images/${imageName}`;
        medicineList.push({
          id: id++,
          name: med.name,
          price: parseFloat(price),
          description: med.desc,
          category: category,
          image: image,
          ratings: [],
          averageRating: Math.random() * 2 + 3, // Random rating between 3-5
          totalRatings: Math.floor(Math.random() * 50) + 5 // Random count 5-55
        });
      });
    });

    return medicineList;
  };

  const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Cough & Cold", "Digestive Health", "First Aid", "Eye Care", "Skin Care"];
  
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (medicine) => {
    if (!isLoggedIn()) {
      showWarning('Please login to add items to cart');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    addToCart(medicine);
    showSuccess(`${medicine.name} added to cart!`);
  };

  const handleRating = async (medicineId, rating) => {
    if (!isLoggedIn()) {
      showWarning('Please login to rate medicines');
      return;
    }
    try {
      const updated = await medicineAPI.rate(medicineId, user._id || user.id, rating);
      setMedicines(medicines.map(m => m._id === medicineId ? updated : m));
      showSuccess('Rating submitted successfully!');
    } catch (error) {
      console.error('Error rating medicine:', error);
    }
  };

  const StarRating = ({ rating, onRate, averageRating, totalRatings, medicineId }) => {
    const [hover, setHover] = useState(0);
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
        <div style={{display: 'flex'}}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: isLoggedIn() ? 'pointer' : 'default',
                color: star <= (hover || rating) ? '#fbbf24' : '#d1d5db',
                fontSize: '1.2rem',
                transition: 'color 0.2s'
              }}
              onClick={() => isLoggedIn() && onRate(medicineId, star)}
              onMouseEnter={() => isLoggedIn() && setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        <span style={{fontSize: '0.75rem', color: '#64748b'}}>
          {averageRating > 0 ? `${averageRating.toFixed(1)} (${totalRatings})` : 'No ratings'}
        </span>
      </div>
    );
  };

  const styles = `
    .browse {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      position: relative;
      padding: 0;
    }
    .browse::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
      z-index: 1;
    }
    .browse > * {
      position: relative;
      z-index: 2;
    }
    .browse-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 3rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .browse-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
    .browse-subtitle {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto;
      font-weight: 400;
    }
    .browse-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .search-section {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
    }
    .search-bar {
      width: 100%;
      max-width: 500px;
      padding: 1rem 1.5rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    .search-bar:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    .search-bar::placeholder {
      color: #64748b;
    }
    .categories {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      padding: 1rem;
      justify-content: center;
      max-width: 100%;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
    }
    .category-btn {
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      color: #000000;
      font-size: 0.875rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .category-btn.active {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    .category-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 1);
    }
    .category-btn.active:hover {
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    }
    .medicine-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .medicine-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
      transform: translateY(0) scale(1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    .medicine-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.8s ease;
    }
    .medicine-card:hover {
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      transform: translateY(-12px) scale(1.03);
      background: rgba(255, 255, 255, 1);
    }
    .medicine-card:hover::before {
      left: 100%;
    }
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(40px) scale(0.9);
      }
      50% {
        opacity: 0.5;
        transform: translateY(20px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    .medicine-card img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
      margin: 0 auto 1rem;
      display: block;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      transition: all 0.4s ease;
      position: relative;
      z-index: 2;
    }
    .medicine-card:hover img {
      transform: scale(1.1) rotate(2deg);
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    .medicine-card img[src*="react.svg"] {
      padding: 10px;
    }
    .medicine-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      z-index: 2;
      letter-spacing: -0.01em;
    }
    .medicine-card:hover h3 {
      transform: translateY(-2px) scale(1.05);
    }
    .medicine-card p {
      margin-bottom: 1rem;
      color: #64748b;
      line-height: 1.6;
      font-size: 0.875rem;
      text-align: center;
    }
    .medicine-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.75rem 0;
      border-top: 1px solid #f3f4f6;
      border-bottom: 1px solid #f3f4f6;
      transition: all 0.3s ease;
      position: relative;
      z-index: 2;
    }
    .medicine-card:hover .medicine-info {
      background: rgba(5, 150, 105, 0.05);
      border-color: rgba(5, 150, 105, 0.2);
      transform: translateY(-2px);
    }
    .price {
      font-weight: 600;
      color: #111827;
      font-size: 1.25rem;
    }
    .quantity {
      font-weight: 500;
      color: #6b7280;
      font-size: 0.875rem;
    }
    .add-to-cart-btn {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      font-size: 0.875rem;
      width: 100%;
      position: relative;
      z-index: 2;
      transform: scale(1);
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .add-to-cart-btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
    }
    .add-to-cart-btn:hover {
      transform: scale(1.05) translateY(-3px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    }
    .add-to-cart-btn:hover::after {
      width: 300px;
      height: 300px;
    }
    .add-to-cart-btn:active {
      transform: scale(0.98) translateY(0);
    }
    @media (max-width: 768px) {
      .browse-content {
        padding: 1rem;
      }
      .medicine-list {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
      .categories {
        gap: 0.25rem;
        margin-bottom: 1.5rem;
      }
      .category-btn {
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
      }
      .medicine-card {
        padding: 1rem;
      }
    }
    @media (max-width: 480px) {
      .browse-header {
        padding: 1.5rem 1rem;
      }
      .browse-title {
        font-size: 1.5rem;
      }
      .browse-content {
        padding: 1rem 0.5rem;
      }
      .medicine-list {
        grid-template-columns: 1fr;
      }
      .categories {
        overflow-x: auto;
        padding-bottom: 0.5rem;
        justify-content: flex-start;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .categories::-webkit-scrollbar {
        display: none;
      }
      .category-btn {
        white-space: nowrap;
        flex-shrink: 0;
        min-width: fit-content;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="browse">
        <div className="browse-header">
          <h1 className="browse-title">Browse Medicines</h1>
          <p className="browse-subtitle">Discover our extensive collection of authentic medicines and healthcare products</p>
        </div>
        <div className="browse-content">
          <div className="search-section">
            <input
              type="text"
              className="search-bar"
              placeholder="Search medicines by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="medicine-list">
            {filteredMedicines.map((medicine, index) => {
              const userRating = medicine.ratings?.find(r => r.userId === (user?._id || user?.id))?.rating || 0;
              return (
              <div key={medicine._id || medicine.id} className="medicine-card" style={{animationDelay: `${index * 0.1}s`}}>
                <img src={medicine.image} alt={medicine.name} />
                <h3>{medicine.name}</h3>
                <p>{medicine.description}</p>
                <StarRating 
                  rating={userRating}
                  onRate={handleRating}
                  averageRating={medicine.averageRating || 0}
                  totalRatings={medicine.totalRatings || 0}
                  medicineId={medicine._id || medicine.id}
                />
                <div className="medicine-info">
                  <span className="price">₹{medicine.price}</span>
                  <span className="quantity">Qty: {medicine.quantity || 1}</span>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(medicine)}>
                  Add to Cart
                </button>
              </div>
              );
            })}
          </div>
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

export default Browse;