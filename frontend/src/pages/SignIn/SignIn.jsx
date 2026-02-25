import React, { useState } from "react";
import "./SignIn.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://kudiher-business-management-app.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="si-container">
      {/* Back */}
      <button className="si-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <h1 className="si-title">Welcome Back</h1>
      <p className="si-subtitle">Sign in to your KudiHer account</p>

      {/* Form */}
      <div className="si-form">
        {/* Error message */}
        {error && <p className="si-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="si-input"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="si-input-icon">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="si-input"
            value={formData.password}
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Forgot password */}
        <div className="si-forgot-row">
          <a href="#" className="si-forgot">
            Forgot password?
          </a>
        </div>

        {/* Sign in button */}
        <button
          className="si-btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* OR divider */}
        <div className="si-divider">
          <span>OR</span>
        </div>

        {/* Google button */}
        <button className="si-btn-google">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </button>

        {/* Sign up link */}
        <p className="si-signup">
          Don't have an account?{" "}
          <a onClick={() => navigate("/create-account")} href="#">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
