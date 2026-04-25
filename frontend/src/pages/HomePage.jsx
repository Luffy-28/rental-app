import { Link } from "react-router-dom";
import { mockProperties } from "../data/staticData";
import PropertyCard from "../components/PropertyCard";

const HomePage = () => {
  const featured = mockProperties.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center py-5">
          <span className="badge bg-primary bg-opacity-25 text-primary-emphasis border border-primary border-opacity-25 px-3 py-2 mb-3">
            ✨ Australia&rsquo;s #1 Rental Platform
          </span>
          <h1 className="display-4 fw-bold mb-3">
            Find Your Perfect <span className="text-primary">Rental Home</span>
          </h1>
          <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: 600 }}>
            Browse verified listings across Australia. Whether you&rsquo;re a
            student, professional, or family — we&rsquo;ve got your next home.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
            <Link to="/properties" className="btn btn-primary btn-lg">
              Browse Properties
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              List Your Property
            </Link>
          </div>

          {/* Search */}
          <div className="mx-auto" style={{ maxWidth: 550 }}>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search by city, suburb, or keyword..."
              />
              <button className="btn btn-primary px-4">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Featured Properties</h2>
            <p className="text-muted">Hand-picked listings you&rsquo;ll love</p>
          </div>
          <div className="row g-4">
            {featured.map((prop) => (
              <div className="col-md-6 col-lg-4" key={prop._id}>
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/properties" className="btn btn-outline-primary">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {[
              { value: "500+", label: "Properties Listed" },
              { value: "200+", label: "Verified Landlords" },
              { value: "1.2K", label: "Happy Tenants" },
              { value: "15+", label: "Cities Covered" },
            ].map((stat, i) => (
              <div className="col-6 col-lg-3" key={i}>
                <div className="card text-center border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h3 className="fw-bold text-primary mb-1">{stat.value}</h3>
                    <p className="text-muted small mb-0">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
