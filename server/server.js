const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const dataPath = path.resolve(__dirname, "data.json");

let buckets = require(dataPath);

const customFormat = (tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    requestHeaders: req.headers,
    requestBody: req.body,
    responseHeaders: res.getHeaders(),
    responseBody: res.body,
  });
};

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(morgan(customFormat, { stream: accessLogStream }));

// endpoints --------------------------------------

// get all buckets
app.get("/buckets", (req, res) => {
  res.json(buckets);
});

// add bucket
app.post("/buckets", (req, res) => {
  const newBucket = req.body;
  buckets.push(newBucket);
  saveDataToFile(buckets);
  res.json({ message: "Bucket added." });
});

// delete bucket
app.delete("/buckets/:id", (req, res) => {
  const bucketId = req.params.id;
  const index = buckets.findIndex((bucket) => bucket.id == bucketId);
  if (index !== -1) {
    buckets.splice(index, 1);
    saveDataToFile(buckets);
    res.json({ message: "Bucket deleted." });
  } else {
    res.status(404).json({ message: "Bucket not found" });
  }
});

// add file to specific bucket
app.post("/buckets/:bucketId/files", (req, res) => {
  const bucketId = req.params.bucketId;
  const fileData = req.body;

  const bucket = buckets.find((bucket) => bucket.id === bucketId);
  if (!bucket) {
    return res.status(404).json({ message: "Bucket not found" });
  }

  bucket.files.push(fileData);
  saveDataToFile(buckets);
  res.json({ message: "File added to bucket." });
});

// delete file from buckett
app.delete("/buckets/:bucketId/files/:fileId", (req, res) => {
  const bucketId = req.params.bucketId;
  const fileId = req.params.fileId;

  const bucket = buckets.find((bucket) => bucket.id === bucketId);
  if (!bucket) {
    return res.status(404).json({ message: "Bucket not found" });
  }

  const fileIndex = bucket.files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) {
    return res.status(404).json({ message: "File not found" });
  }

  bucket.files.splice(fileIndex, 1);
  saveDataToFile(buckets);
  res.json({ message: "File deleted from bucket." });
});

// ----------------------------------------------------
// dump data to file
function saveDataToFile(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
