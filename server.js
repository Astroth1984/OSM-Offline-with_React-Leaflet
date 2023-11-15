const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'assets' directory
app.use('./src/assets', express.static(path.join(__dirname, './src/assets')));

// Redirect requests for tiles to the 'assets/tiles' directory
app.get('/tiles/:z/:x/:y.png', (req, res) => {
  const { z, x, y } = req.params;
  const filePath = path.join(__dirname, './src/assets', 'tiles', z, x, `${y}.png`);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});