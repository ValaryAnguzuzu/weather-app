require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Fix node-fetch import issue for Node.js v20+
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5001;

const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Allow frontend
    methods: "GET",
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
