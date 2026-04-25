import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Registration successful! (static demo)");
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="card shadow border-0" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-body p-4">
          <h3 className="text-center fw-bold mb-1">Create Account</h3>
          <p className="text-center text-muted small mb-4">
            Join RentEasy as a tenant or landlord
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reg-name" className="form-label">Full Name</label>
              <input
                id="reg-name"
                type="text"
                className="form-control"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reg-email" className="form-label">Email</label>
              <input
                id="reg-email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reg-password" className="form-label">Password</label>
              <input
                id="reg-password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reg-role" className="form-label">I am a...</label>
              <select
                id="reg-role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Create Account
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
