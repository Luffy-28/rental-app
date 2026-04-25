import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mockProperties } from "../data/staticData";
import EnquiryModal from "../components/EnquiryModal";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p._id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (!property) {
    return (
      <div className="container text-center py-5">
        <div className="fs-1 mb-3">❌</div>
        <h4>Property not found</h4>
        <Link to="/properties" className="btn btn-primary mt-3">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/properties" className="text-muted text-decoration-none small d-inline-block mb-3">
        ← Back to Properties
      </Link>

      <div className="row g-4">
        {/* Gallery */}
        <div className="col-lg-7">
          <div className="rounded overflow-hidden mb-2">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-100 rounded"
              style={{ height: 400, objectFit: "cover" }}
            />
          </div>
          <div className="d-flex gap-2">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${property.title} ${idx + 1}`}
                className={`rounded border ${activeImage === idx ? "border-primary border-2" : "border-light"}`}
                style={{ width: 80, height: 60, objectFit: "cover", cursor: "pointer", opacity: activeImage === idx ? 1 : 0.6 }}
                onClick={() => setActiveImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <span className="badge bg-primary text-capitalize mb-2">
                {property.propertyType}
              </span>
              <h3 className="fw-bold mb-1">{property.title}</h3>
              <p className="text-muted small">
                📍 {property.address}, {property.city}, {property.state}
              </p>

              <h2 className="text-primary fw-bold my-3">
                ${property.price}
                <span className="text-muted fw-normal fs-6"> /week</span>
              </h2>

              <div className="row g-2 mb-4">
                <div className="col-6">
                  <div className="bg-light rounded p-3 text-center">
                    <div>🛏️</div>
                    <div className="fw-semibold">{property.bedrooms}</div>
                    <div className="text-muted small">Bedrooms</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light rounded p-3 text-center">
                    <div>🚿</div>
                    <div className="fw-semibold">{property.bathrooms}</div>
                    <div className="text-muted small">Bathrooms</div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary w-100 mb-2" onClick={() => setShowEnquiry(true)}>
                Send Enquiry
              </button>
              <button className="btn btn-outline-secondary w-100">
                Save to Favourites ♡
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h4 className="fw-bold mb-3">About this Property</h4>
        <p className="text-muted">{property.description}</p>
      </div>

      {/* Landlord */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body d-flex align-items-center gap-3">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
            style={{ width: 48, height: 48, fontSize: "1.1rem" }}
          >
            {property.landlord.name.charAt(0)}
          </span>
          <div>
            <div className="fw-semibold">{property.landlord.name}</div>
            <div className="text-muted small">{property.landlord.email}</div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-4">
        <h4 className="fw-bold mb-3">Location</h4>
        <MapContainer
          center={[property.coordinates.lat, property.coordinates.lng]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[property.coordinates.lat, property.coordinates.lng]}>
            <Popup>{property.title}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {showEnquiry && (
        <EnquiryModal property={property} onClose={() => setShowEnquiry(false)} />
      )}
    </div>
  );
};

export default PropertyDetailPage;
