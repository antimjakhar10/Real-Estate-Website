import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import BestProperties from "./components/BestProperties";
import FeatureSection from "./components/FeatureSection";
import LuxuryProperties from "./components/LuxuryProperties";
import View360 from "./components/View360";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Aboutus from "./components/pages/Aboutus";
import Property from "./components/pages/Property";
import Contactus from "./components/pages/Contactus";

import PostProperty from "./components/pages/PostProperty";

import Propertydetails from "./components/pages/Propertydetails";
import Blog from "./components/pages/Blog";
import BlogDetails from "./components/pages/Blogdetails";
import AdminEnquiries from "./components/pages/AdminEnquiries";
import AdminLogin from "./components/pages/AdminLogin";
import AdminProperties from "./components/pages/AdminProperties";
import AddEditProperty from "./components/pages/AddEditProperty";
import AdminLayout from "./components/pages/AdminLayout";
import AdminDashboard from "./components/pages/AdminDashboard";
import PropertyGrid from "./components/pages/PropertyGrid";
import AdminCustomersList from "./components/pages/AdminCustomersList";
import AdminCustomersGrid from "./components/pages/AdminCustomersGrid";
import AdminContacts from "./components/pages/AdminContacts";

const Home = () => (
  <>
    <Navbar />
    <Hero />

    <BestProperties />
    <FeatureSection />
    <LuxuryProperties />
    <View360 />
    <Testimonials />
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/location/:locationName" element={<Property />} />

      <Route path="/post-property" element={<PostProperty />} />

      <Route path="/about" element={<Aboutus />} />
      <Route path="/property" element={<Property />} />

      {/* Dynamic route with property ID */}
      <Route path="/property-details/:id" element={<Propertydetails />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-details/:id" element={<BlogDetails />} />

      <Route path="/contact" element={<Contactus />} />

     

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/" element={<AdminLayout />}>
  <Route path="admin-dashboard" element={<AdminDashboard />} />
  <Route path="admin-enquiries" element={<AdminEnquiries />} />
  <Route path="/admin-contacts" element={<AdminContacts />} />
  <Route path="admin-properties" element={<AdminProperties />} />
  <Route path="admin-property-grid" element={<PropertyGrid />} />
  <Route path="admin-add-property" element={<AddEditProperty />} />
  <Route path="admin-edit-property/:id" element={<AddEditProperty />} />
  <Route path="/admin-customers-list" element={<AdminCustomersList />} />
<Route path="/admin-customers-grid" element={<AdminCustomersGrid />} />
</Route>
      
    </Routes>
  );
}

export default App;
