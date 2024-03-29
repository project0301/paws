const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const resolvers = {
	Query: {
		categories: async () => {
			return await Category.find();
		},
		products: async (parent, { category, name }) => {
			const params = {};

			if (category) {
				params.category = category;
			}

			if (name) {
				params.name = {
					$regex: name,
				};
			}

			return await Product.find(params).populate("category");
		},
		product: async (parent, { _id }) => {
			return await Product.findById(_id).populate("category");
		},
		getProducts: async (_, args) => {
			const { search = null, page = 1, limit = 20 } = args;
			let searchQuery = {};
			// run if search is provided
			if (search) {
				// update the search query
				searchQuery = {
					$or: [
						{ name: { $regex: search, $options: "i" } },
						{ description: { $regex: search, $options: "i" } },
						{ image: { $regex: search, $options: "i" } },
					],
				};
			}
			//execute query to search products
			const products = await Product.find(searchQuery)
				.limit(limit)
				.skip((page - 1) * limit)
				.lean();

			//get total documents
			const count = await Product.countDocuments(searchQuery);
			return {
				products,
				totalPages: Math.ceil(count / limit),
				currentPage: page,
			};
		},
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: "orders.products",
					populate: "category",
				});

				user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

				return user;
			}

			throw new AuthenticationError("Not logged in");
		},
		order: async (parent, { _id }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: "orders.products",
					populate: "category",
				});

				return user.orders.id(_id);
			}

			throw new AuthenticationError("Not logged in");
		},
		checkout: async (parent, args, context) => {
			const order = new Order({ products: args.products });
			const { products } = await order.populate(`products`);
			const url = new URL(context.headers.referer).origin;
			const line_items = [];

			for (let i = 0; i < products.length; i++) {
				const productInformation = await Product.findById(products[i]);
				// generate product id
				const product = await stripe.products.create({
					name: productInformation.name,
					description: productInformation.description,
					images: [`${url}/${productInformation.image}`],
				});
				// generate price id using the product id
				const price = await stripe.prices.create({
					product: product.id,
					unit_amount: productInformation.price * 100,
					currency: "usd",
				});
				// add price id to the line items array
				line_items.push({
					price: price.id,
					quantity: 1,
				});
			}
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items,
				mode: "payment",
				success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url}/`,
			});

			return { session: session.id };
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		addOrder: async (parent, { products }, context) => {
			console.log(context);
			if (context.user) {
				const order = new Order({ products });

				await User.findByIdAndUpdate(context.user._id, {
					$push: { orders: order },
				});

				return order;
			}

			throw new AuthenticationError("Not logged in");
		},
		addProduct: async (parent, args, context) => {
			console.log("received ADD_PRODUCT", args);
			if (context.user) {
				const product = await Product.create(args);

				return product;
			}
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}

			throw new AuthenticationError("Not logged in");
		},
		updateProduct: async (parent, { _id, quantity }) => {
			const decrement = Math.abs(quantity) * -1;

			return await Product.findByIdAndUpdate(
				_id,
				{ $inc: { quantity: decrement } },
				{ new: true }
			);
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
