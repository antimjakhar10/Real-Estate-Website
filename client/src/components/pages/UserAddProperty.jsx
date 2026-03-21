import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserAddProperty.css";

const UserAddProperty = () => {
  

  const addFacility = () => {
    if (!newFacility.trim()) return;
    setFacilities([...facilities, newFacility]);
    setNewFacility("");
  };

  const addNearby = () => {
    if (!newNearby.trim()) return;

    if (!nearbyOptions.includes(newNearby)) {
      setNearbyOptions([...nearbyOptions, newNearby]);
    }

    setNewNearby("");
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const user = JSON.parse(localStorage.getItem("user"));

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
    amenities: [],
    nearbyLocations: [],
    images: [],
  });

  const [preview, setPreview] = useState([]);

  // 🔥 FETCH FOR EDIT
  useEffect(() => {
    if (isEdit) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(
        `https://real-estate-website-ai2s.onrender.com/api/properties/${id}`,
      );
      const data = await res.json();

      setForm({
        title: data.title || "",
        type: data.type || "",
        price: data.price || "",
        sqft: data.sqft || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        parking: data.parking || "",
        description: data.description || "",
        location: data.location || "",
        amenities: data.amenities || [],
        nearbyLocations: data.nearbyLocations || [],
        images: [],
      });

      if (data.images) {
        setPreview(
          data.images.map(
            (img) =>
              `https://real-estate-website-ai2s.onrender.com/uploads/${img}`,
          ),
        );
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 AMENITIES
  const toggleAmenity = (item) => {
    if (form.amenities.includes(item)) {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== item),
      });
    } else {
      setForm({
        ...form,
        amenities: [...form.amenities, item],
      });
    }
  };

  // 🔥 IMAGE
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("createdByRole", "user");
    formData.append("createdBy", user?._id);

    Object.keys(form).forEach((key) => {
      if (key === "amenities") {
        form[key].forEach((item) => {
          formData.append("amenities", item);
        });
      } else if (key === "nearbyLocations") {
        form[key].forEach((item) => {
          formData.append("nearbyLocations", JSON.stringify(item));
        });
      } else if (key === "images") {
        form[key].forEach((img) => {
          formData.append("images", img);
        });
      } else {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch(
        isEdit
          ? `https://real-estate-website-ai2s.onrender.com/api/properties/${id}`
          : `https://real-estate-website-ai2s.onrender.com/api/properties`,
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed");

      alert(isEdit ? "Updated ✅" : "Submitted ✅");
      navigate("/user/my-properties");
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  const amenitiesList = [
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

  const nearbyList = ["School", "Hospital", "Metro Station", "Mall", "Park"];

  const [facilities, setFacilities] = useState(amenitiesList);
  const [newFacility, setNewFacility] = useState("");
  const [nearbyOptions, setNearbyOptions] = useState(nearbyList);
  const [newNearby, setNewNearby] = useState("");

  return (
    <form className="user-property-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {isEdit ? "Edit Property" : "Add Property"}
      </h2>

      <div className="form-grid">
        {/* LEFT */}
        <div>
          {/* PROPERTY DETAILS */}
          <div className="form-card">
            <h3 className="card-title">Property Details</h3>

            <div className="form-group">
              <label>Property Title</label>
              <input name="title" value={form.title} onChange={handleChange} />
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
                <input name="sqft" value={form.sqft} onChange={handleChange} />
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
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="form-card">
            <h3 className="card-title">Location Details</h3>

            <div className="form-group">
              <label>Full Address</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* IMAGE */}
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
                onChange={handleImage}
              />

              {preview.length > 0 ? (
                <div className="multi-preview">
                  {preview.map((img, i) => (
                    <img key={i} src={img} className="preview-img" />
                  ))}
                </div>
              ) : (
                <>
                  <p>Click to Upload Property Image</p>
                  <small>PNG, JPG up to 5MB</small>
                </>
              )}
            </div>

            <div className="multi-preview">
              {preview.map((img, i) => (
                <img key={i} src={img} className="preview-img" />
              ))}
            </div>
          </div>

          {/* AMENITIES */}
          <div className="form-card">
            <h3 className="card-title">Facilities</h3>

            <div className="checkbox-grid">
              {facilities.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
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
          </div>

          {/* NEARBY */}
          <div className="form-card">
            <h3 className="card-title">Nearby Locations</h3>

            <div className="checkbox-grid">
              {nearbyOptions.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={form.nearbyLocations.some((n) => n.name === item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          nearbyLocations: [
                            ...form.nearbyLocations,
                            { name: item, dist: "" },
                          ],
                        });
                      } else {
                        setForm({
                          ...form,
                          nearbyLocations: form.nearbyLocations.filter(
                            (n) => n.name !== item,
                          ),
                        });
                      }
                    }}
                  />
                  {item}
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

          {/* BUTTON */}
          <div className="form-card">
            <button className="submit-btn">{isEdit ? "Update Property" : "Submit Property"}</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserAddProperty;
