const http = require('http');
const fs = require('fs');

http.get('https://real-estate-website-ai2s.onrender.com/api/properties/customer', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('api_customer_result.txt', data.substring(0, 1000));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
