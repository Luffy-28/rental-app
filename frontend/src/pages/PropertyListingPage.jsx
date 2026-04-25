import { useState, useRef } from "react";
import { mockProperties } from "../data/staticData";
import PropertyCard from "../components/PropertyCard";

const PropertyListingPage = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const searchRef = useRef(null);

  const filtered = mockProperties.filter((p) => {
    if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (bedrooms && p.bedrooms !== Number(bedrooms)) return false;
    if (propertyType && p.propertyType !== propertyType) return false;
    if (
      search &&
      !p.title.toLowerCase().includes(search.toLowerCase()) &&
      !p.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleSearch = (e) => {
    clearTimeout(searchRef.current);
    const value = e.target.value;
    searchRef.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  };

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setPropertyType("");
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Browse Properties</h2>
      <p className="text-muted mb-4">Find your next home from our verified listings</p>

      <div className="row g-4">
        {/* Filters Sidebar */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">🔍 Filters</h5>

              <div className="mb-3">
                <label className="form-label small">Search</label>
                <input type="text" className="form-control" placeholder="Search..." onChange={handleSearch} />
              </div>

              <div className="mb-3">
                <label className="form-label small">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sydney"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">Price Range ($/wk)</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input type="number" className="form-control" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <input type="number" className="form-control" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small">Bedrooms</label>
                <select className="form-select" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small">Property Type</label>
                <select className="form-select" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="room">Room</option>
                </select>
              </div>

              <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-lg-9">
          <p className="text-muted small mb-3">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{mockProperties.length}</strong> properties
          </p>

          {filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((prop) => (
                <div className="col-md-6 col-xl-4" key={prop._id}>
                  <PropertyCard property={prop} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="fs-1 mb-3">🏚️</div>
              <h5>No properties found</h5>
              <p className="text-muted">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;
