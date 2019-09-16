var express = require("express");
var app = express();
var http = require("http");
app.use(express.json());
//var db = require("./Sequelize");
var jsonfile = require("jsonfile");
var file = "./userdata.json";
var brandFile = "./brand.json";
var pagination = true;
var async = require("express-async-await");
var fetch = require("node-fetch");
var productData = [];

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async function(req, res) {
  console.log("home");
});
app.get("/products", async function(req, res) {
  let pageNumber = 0;
  let rawdata = jsonfile.readFileSync("./userdata.json");

  while (pagination) {
    console.log(pageNumber);
    const result = await fetch(
      `https://www.tatacliq.com/marketplacewebservices/v2/mpl/products/searchProducts/?searchText=%3Arelevance%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3AisLuxuryProduct%3Afalse&isKeywordRedirect=false&isKeywordRedirectEnabled=true&channel=WEB&isTextSearch=false&isFilter=false&page=${pageNumber}&isPwa=true&pageSize=40&typeID=all`
    );

    const resultJson = await result.json();
    if (resultJson) {
      productData.push(resultJson);
      if (pageNumber < 20) {
        pageNumber = pageNumber + 1;
      } else {
        pagination = false;
        console.log("writing at files");
        jsonfile.writeFileSync(file, JSON.stringify([...productData]));
      }
    }
  }
  let product = JSON.parse(rawdata);
  let brandName = [];
  let quantityCount = [];
  let quantity = 0;
  //  storing  brandNames into file
  productData.map(data => {
    data.facetdatacategory &&
      data.facetdatacategory.filters &&
      data.facetdatacategory.filters.map(val => {
        val.childFilters.map(child => {
          quantity = quantity + child.quantity;
        });
        quantityCount.push([val.quantity, quantity]);
      });
  });
  jsonfile.writeFileSync(brandFile, JSON.stringify([...quantityCount]));
  res.json(quantityCount);
});
// app.get("/", async function(req, res) {
//   let customers = await db.CustomerSchema.findAll({ raw: true });
//   res.json(customers);
// });
// app.get("/products", async function(req, res) {
//   let pageNumber = 0;
//   while (pagination) {
//     const result = await fetch(
//       `https://e2e.tataunistore.com/marketplacewebservices/v2/mpl/products/searchProducts/?searchText=%3Arelevance%3Acategory%3AMSH1012100%3AinStockFlag%3Atrue&isKeywordRedirect=false&isKeywordRedirectEnabled=true&channel=WEB&isTextSearch=false&isFilter=false&page=${pageNumber}&isPwa=true&pageSize=40&typeID=all`
//     );

//     const resultJson = await result.json();
//     if (result.json) {
//       // //data.push(...resultJson.searchresult);

//       // resultJson.searchresult &&
//       //   resultJson.searchresult.map(val => {
//       //     return data.push(val);
//       //   });
//       jsonfile.writeFileSync(file, ...resultJson.searchresult, { flag: "a" });
//       if (
//         resultJson.pagination &&
//         resultJson.pagination.totalPages > pageNumber
//       ) {
//         pageNumber = pageNumber + 1;
//       } else {
//         pagination = false;
//       }
//     }
//   }
// });
// app.get("/customers/:id", async function(req, res) {
//   let customers = await db.CustomerSchema.findAll({
//     raw: true,
//     attributes: ["name", "address"],
//     where: { id: req.params.id }
//   });
//   res.json(customers);
// });
// app.post("/customers", async function(req, res) {
//   let newCustomer = await db.CustomerSchema.create(req.body);
//   res.json(newCustomer);
// });
// app.put("/customers/:id", async function(req, res) {
//   let updateCustomer = await db.CustomerSchema.update(req.body, {
//     where: { id: req.params.id }
//   });
//   res.json(updateCustomer);
// });
// app.delete("/customers/:id", async function(req, res) {
//   let updateCustomer = await db.CustomerSchema.destroy({
//     where: { id: req.params.id }
//   });
//   res.json(updateCustomer);
// });

// server is running on port 7000
http.createServer(app).listen(7000, () => {
  console.log("server running");
});
