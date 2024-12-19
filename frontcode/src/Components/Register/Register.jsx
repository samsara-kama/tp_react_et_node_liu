import axios, { AxiosHeaders } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/users", {
        email: email,
        password: password,
        name: username,
      })
      .then((response) => {
        alert("Compte crée avec succès");
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        alert("Erreur lors de la création du compte");
      });
  };

  return (
    <div className="register">
      <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
