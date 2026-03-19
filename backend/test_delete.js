const axios = require('axios');

async function testDeleteProperty() {
  try {
    // We already have test_api_customer.js etc which get properties, lets grab one property id first
    // Note: The token is not validated strictly by default in this basic setup but let's assume it passes or we pass a mock one if needed.
    // The issue was simply that the endpoint didn't exist.
    const getRes = await axios.get("https://real-estate-website-ai2s.onrender.com/api/properties");
    console.log("Found properties:", getRes.data.properties.length);
    if(getRes.data.properties.length > 0) {
      const idToDelete = getRes.data.properties[0]._id;
      console.log("Attempting to delete property:", idToDelete);
      
      const deleteRes = await axios.delete(`https://real-estate-website-ai2s.onrender.com/api/properties/${idToDelete}`);
      console.log("Delete Response:", deleteRes.data);
    }
  } catch (e) {
    if(e.response) {
        console.error("Delete failed:", e.response.status, e.response.data);
    } else {
        console.error("Delete failed:", e.message);
    }
  }
}

testDeleteProperty();
