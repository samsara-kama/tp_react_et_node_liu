import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './Home.css'
const Home = () => {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState([]);
  const token =localStorage.getItem("token");
  const decoded=jwtDecode(token);
  const userId=decoded.id;
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    category: "Real Estate",
    description: "",
    price:"",
  });

  useEffect(() => {
    // Fetch existing recipes
    axios
      .get("http://localhost:8080/annonces", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setAnnonces(response.data);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/annonce",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert("Annonce created successfully!");
        setAnnonces((prevAnnonces) => [...prevAnnonces, response.data]); // Add the new annonce to the list
        setFormData({
          title: "",
          address: "",
          category: "Real Estate",
          description: "",
          price: "",
        }); // Reset the form
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to create annonce.");
      });
  };

  const handleDelete =(id)=>{
    
    const url="http://localhost:8080/annonce/"+id
    console.log(url)
    axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Annonce deleted successfully!");
      })
      .catch((error) => {
      console.error(error);
      alert("Failed to delete annonce.");
  });
  }
  const handleLogOut=()=>{
    localStorage.removeItem("token");
    navigate("/");

  }



  

  return (
    <div>
        <nav className="navbar">
        <h1 className="navbar-title">Mon Bon Coin App</h1>
        <button className="logout-button" onClick={handleLogOut}>Logout</button>
      </nav>
    <div className="home">
        
    <div className="home-container">
        <div >
      <h1>Liste des annonces</h1>
      
      <ul>
        {annonces.map((annonce) => (
          <li key={annonce.id}>
            <p><strong>{annonce.title}</strong></p>
            {userId === annonce.author._id&&(
            <div>
              
            
            <button onClick={()=>handleDelete(annonce._id)}>Delete</button>
            </div>
          )}
            <button onClick={()=>{
                navigate("/Detail/",{state:{id:annonce._id,list:annonces}})
                console.log(annonce._id)
            }}>Details</button>
            
            
          </li>
        ))}
      </ul>
      </div>
        <div>
      <h2>Ajouter une annonce</h2>
      <form onSubmit={handleSubmit}>
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
                <label>Price(euro):</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
        
        <button type="submit">Create Annonce</button>
      </form>
      
      </div>
      
    </div>
    
    </div>
    </div>
    
  );
};

export default Home;
