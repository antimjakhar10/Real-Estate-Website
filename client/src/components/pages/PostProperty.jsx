import React, { useState } from "react";
import "./PostProperty.css";

const amenitiesList = [
  "Pool",
  "Gym",
  "Lift",
  "Parking",
  "Power Backup",
  "Security",
  "Garden",
  "Club House",
];

const PostProperty = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    description: "",
    amenities: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenityChange = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

 const handleSubmit = async () => {

    // ❌ Image check sirf submit pe
    if (!formData.images || formData.images.length === 0) {
      alert("Please upload at least one image ❌");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("type", formData.type);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("sqft", formData.sqft);
    data.append("description", formData.description);

    formData.amenities.forEach((amenity) => {
      data.append("amenities", amenity);
    });

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
console.log("SERVER RESPONSE:", result);

if (!res.ok) {
  alert(result.message || "Server Error ❌");
  return;
}

alert("Property Submitted Successfully ✅");

      setFormData({
        title: "",
        category: "",
        type: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        description: "",
        amenities: [],
        images: [],
      });

      setStep(1);
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post-card">
        <div className="progress-bar">
          <div className={`progress ${step === 1 ? "active" : ""}`}>Basic</div>
          <div className={`progress ${step === 2 ? "active" : ""}`}>
            Details
          </div>
          <div className={`progress ${step === 3 ? "active" : ""}`}>
            Amenities
          </div>
          <div className={`progress ${step === 4 ? "active" : ""}`}>Photos</div>
        </div>

        <form autoComplete="off">
          {step === 1 && (
            <div className="form-step">
              <h3>Basic Information</h3>
              <input
                name="title"
                placeholder="Property Title"
                onChange={handleChange}
                required
              />
              <select name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
              <select name="type" onChange={handleChange} required>
                <option value="">Sale / Rent</option>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                required
              />
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Property Details</h3>
              <input
                name="bedrooms"
                type="number"
                placeholder="Bedrooms"
                onChange={handleChange}
              />
              <input
                name="bathrooms"
                type="number"
                placeholder="Bathrooms"
                onChange={handleChange}
              />
              <input
                name="sqft"
                type="number"
                placeholder="Area (sqft)"
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Select Amenities</h3>
              <div className="amenities-grid">
                {amenitiesList.map((item) => (
                  <label key={item} className="amenity-item">
                    <input
                      type="checkbox"
                      onChange={() => handleAmenityChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h3>Upload Property Photos</h3>

              <label className="custom-upload-btn">
                Select Multiple Images
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </label>

              {formData.images && formData.images.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {Array.from(formData.images).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="preview-img"
                      style={{ width: "160px", borderRadius: "10px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="form-buttons">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="prev-btn"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    setStep(step + 1);
  }}
  className="next-btn"
>
                Next
              </button>
            ) : (
              <button
  type="button"
  className="submit-btn"
  onClick={handleSubmit}
>
                Submit Property
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;
