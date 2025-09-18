const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// Default metrics collection
client.collectDefaultMetrics();

// Custom counter metric
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

app.get("/", (req, res) => {
  httpRequests.inc();
  res.send("Hello from Node.js App 🚀");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Node.js app running on port ${port}`);
});
