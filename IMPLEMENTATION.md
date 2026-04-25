# 🏠 RentEasy — Implementation Guide

> Follow each phase in order. Each section tells you **what to implement**, **how to do it**, and **what to check before moving on**.

---

## 📦 Prerequisites Setup

Before writing any code:

```bash
# Create project root
mkdir rental-app && cd rental-app

# Create folders
mkdir client server

# Init backend
cd server && npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors multer multer-s3 @aws-sdk/client-s3 nodemailer express-validator

# Dev dependencies
npm install -D nodemon

# Init frontend (from project root)
cd ../client
npm create vite@latest . -- --template react
npm install axios react-router-dom @reduxjs/toolkit react-redux react-leaflet leaflet react-toastify
```

Add to `server/package.json`:
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

## ✅ PHASE 1 — Backend Foundation (Days 1–3)

### What to implement:
- Express server entry point
- MongoDB connection
- User model (landlord / tenant / admin roles)
- Register + Login routes with JWT
- Auth middleware to protect routes
- Role middleware to restrict by role

---

### 1.1 — Express Server (`server/server.js`)

**How to do it:**
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes (add as you build them)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### 1.2 — MongoDB Connection (`server/config/db.js`)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### 1.3 — User Model (`server/models/User.js`)

**Fields to include:**
- `name` — String, required
- `email` — String, required, unique
- `password` — String, required (hashed)
- `role` — String, enum: `['tenant', 'landlord', 'admin']`, default: `'tenant'`
- `avatar` — String (S3 URL, optional)
- `createdAt` — Date (use `timestamps: true`)

**How to hash password:**
```javascript
const bcrypt = require('bcryptjs');

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

---

### 1.4 — Auth Controller (`server/controllers/authController.js`)

**Register:**
1. Check if email already exists → return 400 if yes
2. Create new User
3. Return JWT token + user info (no password)

**Login:**
1. Find user by email
2. Call `user.matchPassword(req.body.password)`
3. Return JWT token + user info if match

**Generate JWT helper:**
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
```

---

### 1.5 — Auth Middleware (`server/middleware/authMiddleware.js`)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { protect };
```

---

### 1.6 — Role Middleware (`server/middleware/roleMiddleware.js`)

```javascript
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authorizeRoles };
```

**Usage in routes:**
```javascript
router.post('/', protect, authorizeRoles('landlord', 'admin'), createProperty);
```

### ✅ Phase 1 Checklist
- [ ] Server starts without errors
- [ ] MongoDB connects successfully
- [ ] POST `/api/auth/register` creates a user and returns token
- [ ] POST `/api/auth/login` returns token on valid credentials
- [ ] Protected route returns 401 without token
- [ ] Landlord-only route returns 403 for tenant role

---

## ✅ PHASE 2 — Property CRUD + Image Upload (Days 4–6)

### What to implement:
- Property model
- Full CRUD routes for properties
- AWS S3 image upload via multer-s3
- Search + filter support

---

### 2.1 — Property Model (`server/models/Property.js`)

**Fields:**
- `title` — String, required
- `description` — String, required
- `price` — Number, required
- `propertyType` — enum: `['apartment', 'house', 'studio', 'room']`
- `bedrooms` — Number
- `bathrooms` — Number
- `address` — String
- `city` — String
- `state` — String
- `coordinates` — `{ lat: Number, lng: Number }` (for map pin)
- `images` — Array of Strings (S3 URLs)
- `landlord` — ObjectId ref to User
- `isAvailable` — Boolean, default: true
- `createdAt`, `updatedAt` — via `timestamps: true`

---

### 2.2 — AWS S3 Config (`server/config/s3.js`)

```javascript
const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = s3;
```

---

### 2.3 — Upload Middleware (`server/middleware/uploadMiddleware.js`)

```javascript
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, `properties/${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  },
});

module.exports = upload;
```

**Usage in routes:**
```javascript
router.post('/', protect, authorizeRoles('landlord'), upload.array('images', 5), createProperty);
```

---

### 2.4 — Property Controller

**createProperty:**
- `req.files` gives the uploaded S3 URLs via `file.location`
- Save `req.user._id` as the `landlord` field
- Return the created property

**getProperties (with search + filter):**
```javascript
const { city, minPrice, maxPrice, bedrooms, propertyType, search } = req.query;
const query = { isAvailable: true };

if (city) query.city = { $regex: city, $options: 'i' };
if (bedrooms) query.bedrooms = bedrooms;
if (propertyType) query.propertyType = propertyType;
if (minPrice || maxPrice) {
  query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);
}
if (search) {
  query.$or = [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];
}

const properties = await Property.find(query)
  .populate('landlord', 'name email')
  .sort({ createdAt: -1 });
```

**Other routes to implement:**
- `getPropertyById` — find by `_id`, populate landlord
- `updateProperty` — check `req.user._id === property.landlord` before updating
- `deleteProperty` — same ownership check
- `getMyProperties` — `Property.find({ landlord: req.user._id })`

### ✅ Phase 2 Checklist
- [ ] POST `/api/properties` creates property with images
- [ ] GET `/api/properties?city=Sydney&minPrice=500` filters correctly
- [ ] Only the landlord who created it can update/delete
- [ ] S3 URLs are stored and accessible

---

## ✅ PHASE 3 — Frontend Auth + Routing (Days 7–9)

### What to implement:
- Vite React app with Redux Toolkit
- authSlice — login, register, logout, persist session
- Axios instance with token header
- Register + Login pages
- PrivateRoute for protected pages

---

### 3.1 — Axios Instance (`client/src/utils/axiosInstance.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

### 3.2 — Auth Slice (`client/src/redux/slices/authSlice.js`)

**State shape:**
```javascript
{
  user: null,        // { _id, name, email, role }
  token: null,
  loading: false,
  error: null
}
```

**Rehydrate from localStorage on app load:**
```javascript
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};
```

**Async thunks to build:**
- `loginUser(credentials)` — POST `/auth/login`, save to localStorage
- `registerUser(data)` — POST `/auth/register`, save to localStorage
- `logoutUser()` — clear localStorage, reset state

---

### 3.3 — PrivateRoute (`client/src/routes/PrivateRoute.jsx`)

```javascript
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
```

**Usage in App.jsx:**
```jsx
<Route element={<PrivateRoute roles={['landlord']} />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/add-property" element={<AddProperty />} />
</Route>
```

---

### 3.4 — Register & Login Pages

**Register form fields:** name, email, password, role (dropdown: tenant / landlord)

**Login form fields:** email, password

**Flow:**
1. Dispatch async thunk on submit
2. Show loading spinner while `loading === true`
3. On success → navigate to `/` (tenant) or `/dashboard` (landlord)
4. On error → show error toast via react-toastify

### ✅ Phase 3 Checklist
- [ ] Register creates account and redirects
- [ ] Login persists token in localStorage
- [ ] Refreshing the page keeps user logged in
- [ ] `/dashboard` redirects to login if not authenticated
- [ ] Tenant cannot access landlord-only routes

---

## ✅ PHASE 4 — Property Pages (Days 10–14)

### What to implement:
- PropertyListing page — browse, search, filter
- PropertyDetail page — images, map, enquiry button
- Landlord Dashboard — manage listings
- AddProperty + EditProperty forms

---

### 4.1 — Property Slice (`client/src/redux/slices/propertySlice.js`)

**State shape:**
```javascript
{
  properties: [],
  property: null,       // single property detail
  myProperties: [],     // landlord's listings
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
}
```

**Async thunks:**
- `fetchProperties(filters)` — GET `/properties?city=...&page=...`
- `fetchPropertyById(id)` — GET `/properties/:id`
- `fetchMyProperties()` — GET `/properties/mine`
- `createProperty(formData)` — POST `/properties` (multipart/form-data)
- `updateProperty({ id, formData })` — PUT `/properties/:id`
- `deleteProperty(id)` — DELETE `/properties/:id`

---

### 4.2 — PropertyListing Page

**Features to build:**
- Filter sidebar/bar: city input, price range sliders, bedrooms select, property type select
- Debounced search input (300ms delay using `useRef` + `setTimeout`)
- Grid of `PropertyCard` components
- Pagination component at bottom

**Debounced search pattern:**
```javascript
const searchRef = useRef(null);

const handleSearch = (e) => {
  clearTimeout(searchRef.current);
  searchRef.current = setTimeout(() => {
    dispatch(fetchProperties({ search: e.target.value, ...filters }));
  }, 300);
};
```

---

### 4.3 — PropertyDetail Page

**Sections to build:**
1. Image gallery — show all images, click to enlarge
2. Property info — title, price, bedrooms, type, address
3. Leaflet map — show pin at property coordinates

**Leaflet map setup:**
```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

<MapContainer center={[property.coordinates.lat, property.coordinates.lng]} zoom={15}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[property.coordinates.lat, property.coordinates.lng]}>
    <Popup>{property.title}</Popup>
  </Marker>
</MapContainer>
```

4. Enquiry button (for tenants) → opens modal with EnquiryForm

---

### 4.4 — AddProperty / EditProperty Forms

**Form fields:** title, description, price, type, bedrooms, bathrooms, address, city, state, lat, lng, images (file input, multiple)

**Image upload — send as FormData:**
```javascript
const formData = new FormData();
formData.append('title', data.title);
// ... other fields
images.forEach((img) => formData.append('images', img));

dispatch(createProperty(formData));
```

**In Redux thunk, use multipart header:**
```javascript
const res = await api.post('/properties', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

### ✅ Phase 4 Checklist
- [ ] Filter by city/price/bedrooms updates listing in real time
- [ ] Debounce prevents API call on every keystroke
- [ ] PropertyDetail shows map with correct pin
- [ ] Landlord can add a property with multiple images
- [ ] Landlord dashboard lists only their own properties
- [ ] Edit/Delete works with ownership check

---

## ✅ PHASE 5 — Enquiry System (Days 15–17)

### What to implement:
- Enquiry model
- Submit enquiry (tenant → property)
- View enquiries (landlord → per property)
- Email notification on new enquiry

---

### 5.1 — Enquiry Model (`server/models/Enquiry.js`)

**Fields:**
- `property` — ObjectId ref to Property
- `tenant` — ObjectId ref to User
- `landlord` — ObjectId ref to User
- `message` — String, required
- `phone` — String (optional)
- `status` — enum: `['pending', 'read', 'replied']`, default: `'pending'`
- `createdAt` — via timestamps

---

### 5.2 — Enquiry Controller

**createEnquiry:**
1. Tenant submits message for a property
2. Look up property to get landlord ID
3. Save enquiry with property, tenant, landlord refs
4. Trigger email to landlord via Nodemailer
5. Return created enquiry

**getEnquiriesByLandlord:**
- Find all enquiries where `landlord === req.user._id`
- Populate property (title, city) and tenant (name, email)

**getEnquiriesByTenant:**
- Find all enquiries where `tenant === req.user._id`

**updateEnquiryStatus:**
- Landlord marks enquiry as `'read'` or `'replied'`

---

### 5.3 — Email Notification (`server/utils/sendEmail.js`)

```javascript
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"RentEasy" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
```

**Email template for new enquiry:**
```javascript
await sendEmail({
  to: landlord.email,
  subject: `New Enquiry for "${property.title}"`,
  html: `
    <h3>You have a new enquiry</h3>
    <p><strong>From:</strong> ${tenant.name} (${tenant.email})</p>
    <p><strong>Property:</strong> ${property.title}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
});
```

---

### 5.4 — Enquiry Slice (Frontend)

**Async thunks:**
- `submitEnquiry({ propertyId, message, phone })` — POST `/enquiries`
- `fetchMyEnquiries()` — tenant's sent enquiries
- `fetchPropertyEnquiries()` — landlord's received enquiries

**In Dashboard:** Show enquiry count per property and list messages with status badges

### ✅ Phase 5 Checklist
- [ ] Tenant can submit an enquiry from PropertyDetail page
- [ ] Landlord receives email notification
- [ ] Dashboard shows all received enquiries with tenant info
- [ ] Landlord can mark enquiry as read/replied
- [ ] Tenant cannot enquire on their own property

---

## ✅ PHASE 6 — Polish + Deploy (Days 18–21)

### What to implement:
- Loading skeletons
- Toast notifications
- Error boundaries
- Environment setup for production
- Deploy to Render + Vercel

---

### 6.1 — Skeleton Loading

Use `react-loading-skeleton` or build with Tailwind pulse:

```jsx
// PropertyCard Skeleton
const PropertyCardSkeleton = () => (
  <div className="animate-pulse rounded-lg overflow-hidden shadow">
    <div className="bg-gray-300 h-48 w-full" />
    <div className="p-4 space-y-2">
      <div className="bg-gray-300 h-4 w-3/4 rounded" />
      <div className="bg-gray-300 h-4 w-1/2 rounded" />
    </div>
  </div>
);
```

Show skeletons when `loading === true` in Redux state.

---

### 6.2 — Toast Notifications

```javascript
// In main.jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Wrap app:
<ToastContainer position="top-right" autoClose={3000} />
```

**Where to trigger toasts:**
- Login success / failure
- Property created / deleted
- Enquiry submitted
- Any API error caught in thunk `rejectWithValue`

---

### 6.3 — Environment Variables for Production

**Backend `.env` (never commit this):**
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key_here
AWS_REGION=ap-southeast-2
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
AWS_BUCKET_NAME=renteasy-uploads
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend `.env`:**
```
VITE_API_URL=https://your-render-url.onrender.com/api
```

Add `.env` to `.gitignore`. Add a `.env.example` with dummy values for the repo.

---

### 6.4 — Deployment

**Backend → Render:**
1. Push server folder to GitHub
2. Create new Web Service on render.com
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add all environment variables in Render dashboard

**Frontend → Vercel:**
1. Push client folder to GitHub
2. Import project on vercel.com
3. Set `VITE_API_URL` in Vercel environment variables
4. Deploy — Vercel auto-detects Vite

**CORS update for production:**
```javascript
// server.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
```

### ✅ Phase 6 Checklist
- [ ] Skeleton loaders show while data is fetching
- [ ] Success/error toasts appear for all key actions
- [ ] `.env` is in `.gitignore`, `.env.example` is in repo
- [ ] Backend live on Render
- [ ] Frontend live on Vercel
- [ ] Live demo link works end to end
- [ ] README has screenshots and live demo link

---

## 🗂️ MongoDB Schema Summary

```
User          → _id, name, email, password, role, avatar
Property      → _id, title, description, price, type, bedrooms,
                bathrooms, address, city, state, coordinates,
                images[], landlord(ref:User), isAvailable
Enquiry       → _id, property(ref), tenant(ref), landlord(ref),
                message, phone, status
```

---

## 🔑 Key Environment Variables Reference

| Variable           | Used In        | Purpose                      |
|--------------------|----------------|------------------------------|
| `MONGO_URI`        | server         | MongoDB Atlas connection      |
| `JWT_SECRET`       | server         | Sign/verify tokens            |
| `AWS_ACCESS_KEY`   | server         | S3 upload auth               |
| `AWS_SECRET_KEY`   | server         | S3 upload auth               |
| `AWS_BUCKET_NAME`  | server         | Target S3 bucket             |
| `AWS_REGION`       | server         | S3 region                    |
| `EMAIL_USER`       | server         | Nodemailer sender             |
| `EMAIL_PASS`       | server         | Gmail App Password            |
| `CLIENT_URL`       | server         | CORS allowed origin           |
| `VITE_API_URL`     | client         | Base URL for API calls        |

---

## 📌 Git Commit Convention

Use this pattern for clean GitHub history:

```
feat: add property filter by city and price
fix: resolve JWT expiry not clearing localStorage
refactor: extract PropertyCard into separate component
style: add skeleton loader to property grid
docs: update README with deployment steps
```

---

*Built with MERN Stack — React · Node.js · Express · MongoDB*
