import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="card-img-top w-100 h-100"
          style={{ objectFit: "cover" }}
        />
        <span className="badge bg-dark bg-opacity-75 position-absolute top-0 start-0 m-2 text-capitalize">
          {property.propertyType}
        </span>
        <span className="badge bg-primary position-absolute bottom-0 end-0 m-2 fs-6">
          ${property.price}/wk
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{property.title}</h5>
        <p className="card-text text-muted small">
          📍 {property.city}, {property.state}
        </p>
        <div className="d-flex gap-3 mt-auto mb-2">
          <span className="text-muted small">🛏️ {property.bedrooms} Bed</span>
          <span className="text-muted small">🚿 {property.bathrooms} Bath</span>
        </div>
      </div>

      <div className="card-footer bg-transparent border-top">
        <Link
          to={`/properties/${property._id}`}
          className="btn btn-outline-primary btn-sm w-100"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
