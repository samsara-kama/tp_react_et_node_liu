import React, { useState, useEffect } from "react";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import './Detail.css';
import { jwtDecode } from "jwt-decode";

const Detail = () => {
  const location = useLocation();
  const { id, list } = location.state || {};
  const navigate = useNavigate();
  const token =localStorage.getItem("token");
  const decoded=jwtDecode(token);
  const userId=decoded.id;
  const [singleAnnonce, setSingleAnnonce] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    category: "Real Estate",
    description: "",
    price: "",
  });

  useEffect(() => {
    
    const annonce = list.find((annonce) => annonce._id === id);
    if (annonce) {
      setSingleAnnonce(annonce);
      setFormData({
        title: annonce.title,
        address: annonce.address,
        category: annonce.category,
        description: annonce.description,
        price: annonce.price,
      });
    }
  }, [id, list]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModify = (e) => {
    e.preventDefault();
    
    // Send the updated annonce data
    axios
      .put(`http://localhost:8080/annonce/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Annonce modified successfully!");
        // Update the local list after modification
        const updatedAnnonces = list.map((annonce) =>
          annonce._id === id ? response.data : annonce
        );
        navigate("/home", { state: { list: updatedAnnonces } }); // Navigate back to home page
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to modify annonce.");
      });
  };

  if (!singleAnnonce) {
    return <p>Annonce not found!</p>;
  }


  return (
    <div className="detail">
    <div className="detail-container">
      <h1>Annonce Details</h1>
      <p><strong>Title:</strong> {singleAnnonce.title}</p>
      <p><strong>Address:</strong> {singleAnnonce.address}</p>
      <p><strong>Category:</strong> {singleAnnonce.category}</p>
      <p><strong>Description:</strong> {singleAnnonce.description}</p>
      <p><strong>Price:</strong> ${singleAnnonce.price}</p>
      <p><strong>Author:</strong> {singleAnnonce.author?.name || "Unknown"}</p>
      <Link to="/home" style={{ color: "#2575fc" }}>
                  Back
        </Link>
    </div>
    {userId === singleAnnonce.author._id&&(
    <div className="detail-container">
    <h2>Modify Annonce</h2>
      <form onSubmit={handleModify}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="category-container">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Jobs">Jobs</option>
            <option value="Clothing">Clothing</option>
            <option value="Services">Services</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price (in euro):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Modify Annonce</button>
      </form>
    </div>
    )}
    </div>
  );
};

export default Detail;
