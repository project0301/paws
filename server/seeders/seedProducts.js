const Product = require("../models/Product");
const mongoose = require("mongoose");
const connection = require("../config/connection");

const products = [   
  new Product({
    name: "Retractable Dog Leash",
    description:" 16ft Dog Traction Rope for Large Medium Small Dogs,Break & Lock System",
    image:
      "",
    quantity: 20,
    cateogory: "",
    price: 12
  },
  {
    name: "Cat Collar",
    description:" 16ft Cat Traction Rope for Large Medium Small Dogs,Break & Lock System",
    image:
      "",
    quantity: 20,
    cateogory: "",
    price: 13
  },
  {
    name: "HamsterBall",
    description:" Plastic ball for hamster to run in and keep them healthy",
    image:
      "",
    quantity: 10,
    cateogory: "",
    price: 9
  },
  {
    name: "Bird Cage",
    description:" 10ft metal bird cage",
    image:
      "",
    quantity: 3,
    cateogory: "",
    price: 15
  },
  
  ),]
//connect mongoose
mongoose
  .connect(String(dev.db), { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
products.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === products.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});