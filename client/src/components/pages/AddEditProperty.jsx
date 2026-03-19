import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProperty.css";

const AddEditProperty = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const defaultFacilities = [
    "Pool",
    "Fireplace",
    "Garage",
    "Balcony",
    "Garden",
    "Terrace",
    "View",
    "Elevator",
    "24/7 Security",
    "Parking",
    "Storage",
    "Air Conditioning",
  ];

  const [form, setForm] = useState({
    title: "",
    type: "",
    price: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    description: "",
    location: "",
    status: "",
    amenities: [],
    nearbyLocations: [],
    images: [],
  });

  const [nearbyOptions, setNearbyOptions] = useState([
    "School",
    "Hospital",
    "Metro Station",
    "Shopping Mall",
    "Park",
  ]);

  const [newNearby, setNewNearby] = useState("");

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [facilities, setFacilities] = useState(defaultFacilities);
  const [newFacility, setNewFacility] = useState("");

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    const res = await fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/${id}`);
    const data = await res.json();

    setForm({
  ...data,
  amenities: Array.isArray(data.amenities) ? data.amenities : [],
  nearbyLocations: data.nearbyLocations || [],
  images: [],
});

    if (data.images && data.images.length > 0) {
      setImagePreviews(
        data.images.map((img) => `https://real-estate-website-ai2s.onrender.com/uploads/${img}`),
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleFacility = (item) => {
    if (form.amenities.includes(item)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((f) => f !== item),
      });
    } else {
      setForm({
        ...form,
        amenities: [...form.amenities, item],
      });
    }
  };

  const addFacility = () => {
    if (!newFacility.trim()) return;
    setFacilities([...facilities, newFacility]);
    setNewFacility("");
  };

  const handleNearbyChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        nearbyLocations: [...form.nearbyLocations, { name: value, dist: "" }],
      });
    } else {
      setForm({
        ...form,
        nearbyLocations: form.nearbyLocations.filter(
          (item) => item.name !== value,
        ),
      });
    }
  };
  const addNearby = () => {
    if (!newNearby.trim()) return;

    if (!nearbyOptions.includes(newNearby)) {
      setNearbyOptions([...nearbyOptions, newNearby]);
    }

    setNewNearby("");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    marginTop: "6px",
    outline: "none",
    transition: "0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
    marginBottom: "30px",
    border: "1px solid #f1f5f9",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Title and Price required");
      return;
    }

    setLoading(true);

    const formData = new FormData();

   Object.keys(form).forEach((key) => {

    if (!id && !isAdmin) {
  formData.append("userId", user._id); // 🔥 IMPORTANT
}

  if (key === "amenities") {

    form[key].forEach((item) => {
      formData.append(key, item);
    });

  }

  else if (key === "nearbyLocations") {

    form.nearbyLocations.forEach((item) => {
      formData.append("nearbyLocations", JSON.stringify(item));
    });

  }

  else if (key === "images") {

    form.images.forEach((img) => {
      formData.append("images", img);
    });

  }

  else {

    formData.append(key, form[key]);

  }

});

    // formData.append("createdBy", "Admin");

    const user = JSON.parse(localStorage.getItem("user"));

const isAdmin = user?.role === "admin"; // agar role nahi hai to ignore

const url = id
  ? `https://real-estate-website-ai2s.onrender.com/api/properties/${id}`
  : isAdmin
  ? "https://real-estate-website-ai2s.onrender.com/api/properties/admin"
  : "https://real-estate-website-ai2s.onrender.com/api/properties"; // 🔥 USER API

const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: formData,
    });

    setLoading(false);
    navigate(isAdmin ? "/admin-properties" : "/my-properties");
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <h2 className="form-title">Property Add</h2>

      <div className="form-container">
        <div className="form-grid">
          {/* LEFT SIDE */}
          <div>
            {/* PROPERTY DETAILS */}
            <div className="form-card">
              <h3 className="card-title">Property Details</h3>

              <div className="form-group">
                <label>Property Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <div className="col">
                  <label>Property Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>House</option>
                    <option>Commercial</option>
                  </select>
                </div>

                <div className="col">
                  <label>Price (₹)</label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Area (sq ft)</label>
                  <input
                    name="sqft"
                    value={form.sqft}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>
                </div>

                <div className="col">
                  <label>Bedrooms</label>
                  <input
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Bathrooms</label>
                  <input
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <label>Garage</label>
                  <input
                    name="parking"
                    value={form.parking}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-card">
              <h3 className="card-title">Location Details</h3>

              <div className="form-group">
                <label>Full Address / Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter full property location"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-column">
            <div className="form-card">
              <h3 className="card-title">Upload Image</h3>

              <div
                className="upload-box"
                onClick={() => document.getElementById("imageInput").click()}
              >
                <input
                  id="imageInput"
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (!files.length) return;

                    setForm({ ...form, images: files });

                    const previews = files.map((file) =>
                      URL.createObjectURL(file),
                    );
                    setImagePreviews(previews);
                  }}
                />

                {imagePreviews.length > 0 ? (
                  <div className="multi-preview">
                    {imagePreviews.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="preview"
                        className="preview-img"
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="upload-text">
                      Click to Upload Property Image
                    </p>
                    <p className="upload-subtext">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>

              {/* Facilities */}
              <h4 className="section-subtitle">Facilities</h4>

              <div className="checkbox-grid">
                {facilities.map((item, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={form.amenities.includes(item)}
                      onChange={() => toggleFacility(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              <div className="add-row">
                <input
                  value={newFacility}
                  onChange={(e) => setNewFacility(e.target.value)}
                  placeholder="Enter facility name"
                />
                <button type="button" onClick={addFacility}>
                  + Add
                </button>
              </div>

              {/* Nearby */}
              <div className="nearby-section">
                <h4 className="section-subtitle">Nearby Locations</h4>

                <div className="checkbox-grid">
                  {nearbyOptions.map((place, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={place}
                       checked={form.nearbyLocations.some((item) => item.name === place)}
                        onChange={handleNearbyChange}
                      />
                      {place}
                    </label>
                  ))}
                </div>

                {form.nearbyLocations.map((item, index) => (
                  <input
                    key={index}
                    placeholder={`Distance for ${item.name}`}
                    value={item.dist}
                    onChange={(e) => {
                      const updated = [...form.nearbyLocations];
                      updated[index].dist = e.target.value;
                      setForm({ ...form, nearbyLocations: updated });
                    }}
                  />
                ))}

                <div className="add-row">
                  <input
                    value={newNearby}
                    onChange={(e) => setNewNearby(e.target.value)}
                    placeholder="Enter nearby place"
                  />
                  <button type="button" onClick={addNearby}>
                    + Add
                  </button>
                </div>
              </div>
            </div>

            <div className="form-card submit-card">
              <button type="submit" className="submit-btn full-submit">
                {loading
                  ? "Saving..."
                  : id
                    ? "Update Property"
                    : "Submit Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddEditProperty;
