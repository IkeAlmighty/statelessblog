const path = require("path");

const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`starting server on port ${process.env.PORT}`)
);
