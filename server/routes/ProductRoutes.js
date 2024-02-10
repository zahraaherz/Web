import express from 'express';
import Product from '../models/Product.js';
import { admin, protectRoute } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const page = parseInt(req.params.page); // 1, 2 or 3
	const perPage = parseInt(req.params.perPage); // 10

	const products = await Product.find({});

	if (page && perPage) {
		const totalPages = Math.ceil(products.length / perPage);
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedProducts = products.slice(startIndex, endIndex);
		res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
	} else {
		res.json({ products, pagination: {} });
	}
};

const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
};

// for admin 

const createNewProduct = asyncHandler(async (req, res) => {
	const { brand, name, category, stock, price, images, productIsNew, description } = req.body;

	const newProduct = await Product.create({
		brand,
		name,
		category,
		stock,
		price,
		images: images,
		productIsNew,
		description,
	});
	await newProduct.save();

	const products = await Product.find({});

	if (newProduct) {
		res.json(products);
	} else {
		res.status(404);
		throw new Error('Product could not be uploaded.');
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const { brand, name, category, stock, price, id, productIsNew, description } = req.body;

	const product = await Product.findById(id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.brand = brand;
		product.category = category;
		product.stock = stock;
		product.productIsNew = productIsNew;

		await product.save();

		const products = await Product.find({});

		res.json(products);
	} else {
		res.status(404);
		throw new Error('Product not found.');
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});


productRoutes.route('/:page/:perPage').get(getProducts);
productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/:id').delete(protectRoute, admin, deleteProduct);
productRoutes.route('/').put(protectRoute, admin, updateProduct);
productRoutes.route('/').post(protectRoute, admin, createNewProduct);

export default productRoutes;