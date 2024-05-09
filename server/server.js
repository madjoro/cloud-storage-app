const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let buckets = require("./data.json");

// endpoints --------------------------------------
app.get("/buckets", (req, res) => {
  res.json(buckets);
});

app.post("/buckets", (req, res) => {
  const newBucket = req.body;
  buckets.push(newBucket);
  saveDataToFile(buckets);
  res.json({ message: "Bucket added successfully" });
});

app.put("/buckets/:id", (req, res) => {
  const bucketId = req.params.id;
  const updatedBucket = req.body;
  const index = buckets.findIndex((bucket) => bucket.id == bucketId);
  if (index !== -1) {
    buckets[index] = updatedBucket;
    saveDataToFile(buckets);
    res.json({ message: "Bucket updated successfully" });
  } else {
    res.status(404).json({ message: "Bucket not found" });
  }
});

app.delete("/buckets/:id", (req, res) => {
  const bucketId = req.params.id;
  const index = buckets.findIndex((bucket) => bucket.id == bucketId);
  if (index !== -1) {
    buckets.splice(index, 1);
    saveDataToFile(buckets);
    res.json({ message: "Bucket deleted successfully" });
  } else {
    res.status(404).json({ message: "Bucket not found" });
  }
});

// dump data to file
function saveDataToFile(data) {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
