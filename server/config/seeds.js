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
})