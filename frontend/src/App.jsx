import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import AddPropertyPage from "./pages/AddPropertyPage";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "56px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/properties" element={<PropertyListingPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
