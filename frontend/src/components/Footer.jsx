import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold mb-3">🏠 RentEasy</h5>
            <p className="text-secondary small">
              Find your perfect rental home with ease. Browse hundreds of
              verified listings across Australia.
            </p>
          </div>

          <div className="col-6 col-lg-2 mb-4">
            <h6 className="fw-semibold text-uppercase small mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li><Link to="/properties" className="text-secondary text-decoration-none small d-block py-1">Browse Properties</Link></li>
              <li><Link to="/properties?type=apartment" className="text-secondary text-decoration-none small d-block py-1">Apartments</Link></li>
              <li><Link to="/properties?type=house" className="text-secondary text-decoration-none small d-block py-1">Houses</Link></li>
              <li><Link to="/properties?type=studio" className="text-secondary text-decoration-none small d-block py-1">Studios</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 mb-4">
            <h6 className="fw-semibold text-uppercase small mb-3">Landlords</h6>
            <ul className="list-unstyled">
              <li><Link to="/add-property" className="text-secondary text-decoration-none small d-block py-1">List a Property</Link></li>
              <li><Link to="/dashboard" className="text-secondary text-decoration-none small d-block py-1">Dashboard</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none small d-block py-1">Create Account</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 mb-4">
            <h6 className="fw-semibold text-uppercase small mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-secondary text-decoration-none small d-block py-1">Help Centre</a></li>
              <li><a href="#!" className="text-secondary text-decoration-none small d-block py-1">Terms of Service</a></li>
              <li><a href="#!" className="text-secondary text-decoration-none small d-block py-1">Privacy Policy</a></li>
              <li><a href="#!" className="text-secondary text-decoration-none small d-block py-1">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center text-secondary small mb-0">
          © 2026 RentEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
