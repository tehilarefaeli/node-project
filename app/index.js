const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
