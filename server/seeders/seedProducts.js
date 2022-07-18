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
    cateogory: dog,
    price: 12
  },
  {
    name: "Cat Collar",
    description:" 16ft Cat Traction Rope for Large Medium Small Dogs,Break & Lock System",
    image:
      "",
    quantity: 20,
    cateogory: cat,
    price: 13
  },
  {
    name: "HamsterBall",
    description:" Plastic ball for hamster to run in and keep them healthy",
    image:
      "",
    quantity: 10,
    cateogory: rodent,
    price: 9
  },
  {
    name: "Bird Cage",
    description:" 10ft metal bird cage",
    image:
      "",
    quantity: 3,
    cateogory: bird,
    price: 15
  },
  {
    name: "Snake enclosure",
    description:"30x30 snake enclosure made with glass, and has plenty of space to keep your snake confortable",
    image:
      "",
    quantity: 2,
    cateogory: reptile,
    price: 100
  },
  
  ),]
//connect mongoose
mongoose
  .connect(String(connection.db), { useNewUrlParser: true })
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