import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    propertyType: { type: String, enum: ['apartment', 'house', 'studio', 'room'] },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    images: [{ type: String }],
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
