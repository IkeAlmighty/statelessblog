const fs = require("fs");
const path = require("path");

const lzString = require("lz-string");

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/p/:pagedata", (req, res) => {
  const { pagedata } = req.params;

  // decompress the pagedata:
  const compressed = lzString.compress(pagedata);
  console.log("compressed:", compressed);

  console.log("decompressed:", lzString.decompress(compressed));

  res.send(pagedata);
});

app.get("/e/:pagedata", (req, res) => {
  const { pagedata } = req.params;

  const decompressed = lzString.decompress(pagedata);

  res.render("edit", { content: decompressed });
});

app.listen(process.env.PORT, () =>
  console.log(`starting server on port ${process.env.PORT}`)
);
