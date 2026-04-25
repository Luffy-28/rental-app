import { useState } from "react";

const EnquiryModal = ({ property, onClose }) => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {submitted ? "Enquiry Sent!" : "Send Enquiry"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {submitted ? (
              <div className="text-center py-4">
                <div className="fs-1 mb-3">✅</div>
                <h5>Success!</h5>
                <p className="text-muted">
                  Your message about &quot;{property.title}&quot; has been sent
                  to the landlord. They will get back to you soon.
                </p>
                <button className="btn btn-primary mt-2" onClick={onClose}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-muted small mb-3">
                  Interested in &quot;{property.title}&quot;? Send a message to
                  the landlord.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="enquiry-message" className="form-label">
                      Your Message *
                    </label>
                    <textarea
                      id="enquiry-message"
                      className="form-control"
                      rows="4"
                      placeholder="Hi, I'm interested in this property..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="enquiry-phone" className="form-label">
                      Phone (optional)
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      className="form-control"
                      placeholder="0400 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Enquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
