var express = require("express");
var app = express();
var http = require("http");
app.use(express.json());
var db = require("./Sequelize");

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async function(req, res) {
  let customers = await db.CustomerSchema.findAll({ raw: true });
  res.json(customers);
});

app.get("/customers/:id", async function(req, res) {
  let customers = await db.CustomerSchema.findAll({
    raw: true,
    attributes: ["name", "address"],
    where: { id: req.params.id }
  });
  res.json(customers);
});
app.post("/customers", async function(req, res) {
  let newCustomer = await db.CustomerSchema.create(req.body);
  res.json(newCustomer);
});
app.put("/customers/:id", async function(req, res) {
  let updateCustomer = await db.CustomerSchema.update(req.body, {
    where: { id: req.params.id }
  });
  res.json(updateCustomer);
});
app.delete("/customers/:id", async function(req, res) {
  let updateCustomer = await db.CustomerSchema.destroy({
    where: { id: req.params.id }
  });
  res.json(updateCustomer);
});

// server is running on port 7000
http.createServer(app).listen(7000, () => {
  console.log("server running");
});
