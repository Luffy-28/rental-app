import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: { type: String, required: true },
    phone: { type: String },
    status: { type: String, enum: ['pending', 'read', 'replied'], default: 'pending' },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);
