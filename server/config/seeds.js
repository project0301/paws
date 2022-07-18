const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async() => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Reptiles' },
      { name: 'Dogs' },
      { name: 'Cats' },
      { name: 'Birds' },
      { name: 'Rodents' },
      { name: 'Fish' }
    ]);

    console.log('categories seeded');
    await Product.deleteMany();
      const products = await Product.insertMany([
    {
      name: 'Dog collar',
      description:
        '16ft retrackable collar, comes in all black',
      image: '',    
      category: categories[1]._id,
      price: 10,
      quantity: 30
    },
    {
      name: 'Cat litter',
      description:
        'Scent free and oderless cat litter, that will last for weeks',
      image: '',
      category: categories[2]._id,
      price: 20,
      quantity: 40
    },
    {
      name: 'Snake Enclosure',
      category: categories[0]._id,
      description:
        'Large glass snake enclosure with plenty of room to decorate and have your snake feel at home in',
      image: '',
      price: 50,
      quantity: 20
    },
    {
      name: 'Bird Cage',
      category: categories[3]._id,
      description:
        'Light Metal bird cage to house your birds and can be easily hung anywhere',
      image: '',
      price: 25,
      quantity: 45
    },
    {
      name: 'Hamster ball',
      category: categories[4]._id,
      description:
        'Small plastic hamster ball for your hamster to play and run around in, all while being safe',
      image: '',
      price: 12,
      quantity: 50
    },
    {
      name: 'Fish filter',
      category: categories[5]._id,
      description:
        'New fish filter allowing the water to consistenlty stay clean and the right tempreture',
      image: '',
      price: 200,
      quantity: 15
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Roy',
    lastName: 'tester',
    email: 'roytester@gmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[1]._id]
      }
    ]
  },
  {
    firstName: 'Ian',
    lastName: 'tester',
    email: 'iantester@gmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[2]._id, products[3]._id]
      }
    ]
  },
  {
    firstName: 'Anika',
    lastName: 'tester',
    email: 'anikatester@gmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[4]._id, products[5]._id]
      }
    ]
  }
  );

  console.log('users seeded');



})