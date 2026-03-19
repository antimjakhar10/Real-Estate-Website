import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";

const UserRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully ✅");
      navigate("/user/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="user-auth-container">
      <div className="user-auth-card">
        <h2>User Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Register</button>

        <p>
          Already have an account?{" "}
          <Link to="/user/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;