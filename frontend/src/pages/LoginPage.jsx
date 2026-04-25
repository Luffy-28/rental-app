import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Login successful! (static demo)");
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
      <div className="card shadow border-0" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-body p-4">
          <h3 className="text-center fw-bold mb-1">Welcome Back</h3>
          <p className="text-center text-muted small mb-4">
            Sign in to your RentEasy account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">Email</label>
              <input
                id="login-email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="login-password" className="form-label">Password</label>
              <input
                id="login-password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Sign In
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Don&rsquo;t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
