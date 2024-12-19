import axios from "axios";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Connexion réussie");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la connexion");
      });
  };

  return (
    <div className="login">
    <div class="login-container">
      <h1>Login</h1>
      <input
        type="text"
        
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button  onClick={handleLogin}>Login</button>
      <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2575fc" }}>
            Register here
          </Link>
        </p>
    </div>
    </div>
  );
};

export default Login;
