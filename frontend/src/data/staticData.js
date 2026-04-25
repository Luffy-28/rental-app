// ===== Mock Users =====
export const mockUser = {
  _id: "u1",
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "landlord",
  avatar: null,
};

export const mockTenant = {
  _id: "u2",
  name: "Sarah Williams",
  email: "sarah@example.com",
  role: "tenant",
  avatar: null,
};

// ===== Mock Properties =====
export const mockProperties = [
  {
    _id: "p1",
    title: "Modern City Apartment",
    description:
      "Beautifully furnished 2-bedroom apartment in the heart of Sydney CBD with stunning harbour views. Features open-plan living, modern kitchen, and balcony.",
    price: 650,
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    address: "42 George St",
    city: "Sydney",
    state: "NSW",
    coordinates: { lat: -33.8688, lng: 151.2093 },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    isAvailable: true,
    createdAt: "2026-04-10T08:00:00Z",
  },
  {
    _id: "p2",
    title: "Cozy Studio near University",
    description:
      "Perfect for students! A cozy studio apartment just a 5-minute walk from campus. Includes utilities, WiFi, and access to a shared laundry.",
    price: 320,
    propertyType: "studio",
    bedrooms: 1,
    bathrooms: 1,
    address: "15 University Ave",
    city: "Melbourne",
    state: "VIC",
    coordinates: { lat: -37.8136, lng: 144.9631 },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    isAvailable: true,
    createdAt: "2026-04-12T10:30:00Z",
  },
  {
    _id: "p3",
    title: "Spacious Family House",
    description:
      "Large 4-bedroom family home with a big backyard, double garage, and modern renovations throughout. Quiet neighbourhood close to schools and parks.",
    price: 850,
    propertyType: "house",
    bedrooms: 4,
    bathrooms: 2,
    address: "88 Elm Street",
    city: "Brisbane",
    state: "QLD",
    coordinates: { lat: -27.4698, lng: 153.0251 },
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u3", name: "Mike Chen", email: "mike@example.com" },
    isAvailable: true,
    createdAt: "2026-04-15T14:00:00Z",
  },
  {
    _id: "p4",
    title: "Luxury Penthouse Suite",
    description:
      "Stunning penthouse with floor-to-ceiling windows, rooftop terrace, and premium finishes. Includes concierge, gym, and pool access.",
    price: 1200,
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    address: "1 Crown St",
    city: "Sydney",
    state: "NSW",
    coordinates: { lat: -33.8712, lng: 151.2055 },
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    isAvailable: true,
    createdAt: "2026-04-18T09:00:00Z",
  },
  {
    _id: "p5",
    title: "Charming Room in Shared House",
    description:
      "Furnished private room in a friendly share house. Common areas include kitchen, living room, and garden. Bills included in rent.",
    price: 220,
    propertyType: "room",
    bedrooms: 1,
    bathrooms: 1,
    address: "7 Maple Rd",
    city: "Perth",
    state: "WA",
    coordinates: { lat: -31.9505, lng: 115.8605 },
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u3", name: "Mike Chen", email: "mike@example.com" },
    isAvailable: true,
    createdAt: "2026-04-20T11:30:00Z",
  },
  {
    _id: "p6",
    title: "Beachside Studio Retreat",
    description:
      "Wake up to ocean views in this light-filled studio just 50m from the beach. Ideal for a relaxed lifestyle with cafés and shops nearby.",
    price: 480,
    propertyType: "studio",
    bedrooms: 1,
    bathrooms: 1,
    address: "22 Ocean Pde",
    city: "Gold Coast",
    state: "QLD",
    coordinates: { lat: -28.0167, lng: 153.4 },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=500&fit=crop",
    ],
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    isAvailable: true,
    createdAt: "2026-04-22T16:00:00Z",
  },
];

// ===== Mock Enquiries =====
export const mockEnquiries = [
  {
    _id: "e1",
    property: { _id: "p1", title: "Modern City Apartment", city: "Sydney" },
    tenant: { _id: "u2", name: "Sarah Williams", email: "sarah@example.com" },
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    message:
      "Hi, I am very interested in this apartment. Is it available for a 6-month lease? I can provide references.",
    phone: "0412345678",
    status: "pending",
    createdAt: "2026-04-23T09:15:00Z",
  },
  {
    _id: "e2",
    property: { _id: "p4", title: "Luxury Penthouse Suite", city: "Sydney" },
    tenant: { _id: "u4", name: "James Lee", email: "james@example.com" },
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    message:
      "Would love to schedule an inspection this weekend. Is Saturday morning available?",
    phone: "0423456789",
    status: "read",
    createdAt: "2026-04-22T14:30:00Z",
  },
  {
    _id: "e3",
    property: { _id: "p2", title: "Cozy Studio near University", city: "Melbourne" },
    tenant: { _id: "u5", name: "Emma Davis", email: "emma@example.com" },
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    message:
      "I'm starting uni next semester and this looks perfect. Is it still available from July?",
    phone: "0434567890",
    status: "replied",
    createdAt: "2026-04-21T18:00:00Z",
  },
  {
    _id: "e4",
    property: { _id: "p6", title: "Beachside Studio Retreat", city: "Gold Coast" },
    tenant: { _id: "u2", name: "Sarah Williams", email: "sarah@example.com" },
    landlord: { _id: "u1", name: "Alex Johnson", email: "alex@example.com" },
    message:
      "Beautiful place! Can we negotiate on the price for a 12-month lease?",
    phone: "0412345678",
    status: "pending",
    createdAt: "2026-04-24T10:45:00Z",
  },
];
