const Category = require("../models/Category");
const mongoose = require("mongoose");
const connection = require("../config/connection");

const Category = [   
    new Category({
        name:"Dogs"
    },
    {
        name:"Cats"
    },
    {
        name:"Rodents"
    },
    {
        name:"Reptails"
    },
    {
        name:"Birds"
    }
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
  category.map(async (p, index) => {
    await p.save((err, result) => {
      if (index === category.length - 1) {
        console.log("DONE!");
        mongoose.disconnect();
      }
    });
  });