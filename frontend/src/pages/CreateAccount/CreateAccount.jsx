import React, { useState } from "react";
import "./CreateAccount.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://kudiher-business-management-app.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phone,
            businessName: formData.businessName,
            businessType: formData.businessType,
            businessAddress: formData.businessAddress,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();
      console.log("Status:", response.status);
      console.log("API response:", JSON.stringify(data));

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      // Navigate to business setup
      navigate("/business-setup");
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-container">
      <button className="ca-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="ca-title">Create your account</h1>
      <p className="ca-subtitle">Start tracking your business finances today</p>

      {/* Show error if any */}
      {error && <p className="ca-error">{error}</p>}

      {/* Full name & Email */}
      <div className="ca-card">
        <div className="ca-field">
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="ca-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Phone number */}
      <div className="ca-card">
        <div className="ca-field">
          <label>Phone number</label>
          <input
            type="text"
            name="phone"
            placeholder="e.g. 08012345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Business info */}
      <div className="ca-card">
        <div className="ca-field">
          <label>Business name</label>
          <input
            type="text"
            name="businessName"
            placeholder="Business name"
            value={formData.businessName}
            onChange={handleChange}
          />
        </div>
        <div className="ca-field">
          <label>Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option>Retail</option>
            <option>Service</option>
            <option>Wholesale</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Business address */}
      <div className="ca-card">
        <div className="ca-field">
          <label>Business address</label>
          <input
            type="text"
            name="businessAddress"
            placeholder="Street, City, State"
            value={formData.businessAddress}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Password */}
      <div className="ca-card">
        <div className="ca-field">
          <label>Password</label>
          <div className="ca-input-icon">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>
        <div className="ca-field">
          <label>Confirm password</label>
          <div className="ca-input-icon">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <p className="ca-hint">
            Use a strong password with a symbol, number, and uppercase character
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        className="ca-btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="ca-signin">
        Already have an account?{" "}
        <a onClick={() => navigate("/signin")} href="#">
          Sign in
        </a>
      </p>
    </div>
  );
}

export default CreateAccount;
