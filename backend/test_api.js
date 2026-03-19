const http = require('http');

http.get('https://real-estate-website-ai2s.onrender.com/api/properties/admin/all', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.substring(0, 500));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
