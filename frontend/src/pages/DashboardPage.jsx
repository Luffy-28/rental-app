import { Link } from "react-router-dom";
import { mockProperties, mockEnquiries, mockUser } from "../data/staticData";

const DashboardPage = () => {
  const myProperties = mockProperties.filter(
    (p) => p.landlord._id === mockUser._id
  );
  const myEnquiries = mockEnquiries.filter(
    (e) => e.landlord._id === mockUser._id
  );
  const pendingCount = myEnquiries.filter((e) => e.status === "pending").length;

  const statusBadge = (status) => {
    const map = { pending: "warning", read: "info", replied: "success" };
    return <span className={`badge bg-${map[status]}`}>{status}</span>;
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Dashboard</h2>
      <p className="text-muted mb-4">
        Welcome back, <strong>{mockUser.name}</strong>! Manage your properties
        and enquiries.
      </p>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { value: myProperties.length, label: "My Properties", color: "primary" },
          { value: myEnquiries.length, label: "Total Enquiries", color: "success" },
          { value: pendingCount, label: "Pending Enquiries", color: "warning" },
        ].map((s, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h3 className={`fw-bold text-${s.color} mb-1`}>{s.value}</h3>
                <p className="text-muted small mb-0">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Properties */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">My Properties</h4>
        <Link to="/add-property" className="btn btn-primary btn-sm">
          + Add Property
        </Link>
      </div>
      <div className="card border-0 shadow-sm mb-4">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Property</th>
                <th>City</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProperties.map((p) => (
                <tr key={p._id}>
                  <td>
                    <Link to={`/properties/${p._id}`} className="text-decoration-none fw-semibold">
                      {p.title}
                    </Link>
                  </td>
                  <td>{p.city}</td>
                  <td>${p.price}/wk</td>
                  <td>
                    <span className="badge bg-primary text-capitalize">{p.propertyType}</span>
                  </td>
                  <td>
                    <span className={`badge bg-${p.isAvailable ? "success" : "danger"}`}>
                      {p.isAvailable ? "Available" : "Rented"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-outline-secondary btn-sm">Edit</button>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiries */}
      <h4 className="fw-bold mb-3">Received Enquiries</h4>
      <div className="d-flex flex-column gap-3">
        {myEnquiries.map((enq) => (
          <div className="card border-0 shadow-sm" key={enq._id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">{enq.property.title}</span>
                {statusBadge(enq.status)}
              </div>
              <p className="text-muted small mb-2">{enq.message}</p>
              <div className="d-flex justify-content-between text-muted small">
                <span>
                  From: <strong>{enq.tenant.name}</strong> ({enq.tenant.email})
                </span>
                <span>{new Date(enq.createdAt).toLocaleDateString("en-AU")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
