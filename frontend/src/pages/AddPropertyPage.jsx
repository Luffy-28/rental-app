import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddPropertyPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "apartment",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Property listed successfully! (static demo)");
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Add New Property</h2>
      <p className="text-muted mb-4">
        Fill in the details below to list your property on RentEasy.
      </p>

      <div className="card border-0 shadow-sm" style={{ maxWidth: 800 }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <h5 className="fw-semibold mb-3 pb-2 border-bottom">Basic Information</h5>

            <div className="mb-3">
              <label htmlFor="prop-title" className="form-label">Property Title *</label>
              <input id="prop-title" name="title" type="text" className="form-control" placeholder="e.g. Modern City Apartment" value={form.title} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="prop-desc" className="form-label">Description *</label>
              <textarea id="prop-desc" name="description" className="form-control" rows="4" placeholder="Describe your property..." value={form.description} onChange={handleChange} required />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="prop-price" className="form-label">Price ($/week) *</label>
                <input id="prop-price" name="price" type="number" className="form-control" placeholder="500" value={form.price} onChange={handleChange} required min="0" />
              </div>
              <div className="col-md-6">
                <label htmlFor="prop-type" className="form-label">Property Type</label>
                <select id="prop-type" name="propertyType" className="form-select" value={form.propertyType} onChange={handleChange}>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="room">Room</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="prop-beds" className="form-label">Bedrooms</label>
                <input id="prop-beds" name="bedrooms" type="number" className="form-control" placeholder="2" value={form.bedrooms} onChange={handleChange} min="0" />
              </div>
              <div className="col-md-6">
                <label htmlFor="prop-baths" className="form-label">Bathrooms</label>
                <input id="prop-baths" name="bathrooms" type="number" className="form-control" placeholder="1" value={form.bathrooms} onChange={handleChange} min="0" />
              </div>
            </div>

            {/* Location */}
            <h5 className="fw-semibold mb-3 pb-2 border-bottom">Location</h5>

            <div className="mb-3">
              <label htmlFor="prop-address" className="form-label">Address</label>
              <input id="prop-address" name="address" type="text" className="form-control" placeholder="42 George St" value={form.address} onChange={handleChange} />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label htmlFor="prop-city" className="form-label">City</label>
                <input id="prop-city" name="city" type="text" className="form-control" placeholder="Sydney" value={form.city} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label htmlFor="prop-state" className="form-label">State</label>
                <input id="prop-state" name="state" type="text" className="form-control" placeholder="NSW" value={form.state} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label htmlFor="prop-lat" className="form-label">Latitude</label>
                <input id="prop-lat" name="lat" type="text" className="form-control" placeholder="-33.8688" value={form.lat} onChange={handleChange} />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label htmlFor="prop-lng" className="form-label">Longitude</label>
                <input id="prop-lng" name="lng" type="text" className="form-control" placeholder="151.2093" value={form.lng} onChange={handleChange} />
              </div>
            </div>

            {/* Images */}
            <h5 className="fw-semibold mb-3 pb-2 border-bottom">Images</h5>
            <div
              className="border border-2 border-dashed rounded p-5 text-center mb-4"
              style={{ cursor: "pointer", borderStyle: "dashed" }}
            >
              <div className="fs-1 mb-2">📷</div>
              <p className="mb-1 fw-semibold">Click to upload</p>
              <p className="text-muted small mb-0">PNG, JPG up to 5MB (max 5 images)</p>
            </div>

            {/* Actions */}
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Publish Property
              </button>
              <Link to="/dashboard" className="btn btn-outline-secondary btn-lg">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
