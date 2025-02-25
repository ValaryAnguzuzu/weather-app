require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Fix node-fetch import issue for Node.js v20+
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5001;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
