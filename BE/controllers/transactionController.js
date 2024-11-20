const Transaction = require("../models/Transaction");
const axios = require("axios");

exports.initializeDatabase = async (req, res) => {
	try {
		const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

		const transformedData = data.map((item) => ({
			...item,
			dateOfSale: new Date(item.dateOfSale), // Convert ISO string to Date object
		}));

		await Transaction.deleteMany({});
		await Transaction.insertMany(transformedData);

		res.status(200).json({ message: "Database initialized successfully." });
	} catch (error) {
		res.status(500).json({ message: "Error initializing database", error });
	}
};

// List transactions with search and pagination (month filter)
exports.listTransactions = async (req, res) => {
	const { month, search = "", page = 1, perPage = 10 } = req.query;

	// Convert month input into a number (1 for January, 2 for February, etc.)
	const monthNumber = parseInt(month, 10);

	try {
		// Build the query to match month and search parameters
		const query = {
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }, // Match the month
			$or: [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
				{ price: isNaN(search) ? -1 : Number(search) },
			],
		};

		// Fetch transactions with pagination
		const transactions = await Transaction.find(query)
			.skip((page - 1) * perPage)
			.limit(Number(perPage));

		// Get total count for the pagination
		const totalCount = await Transaction.countDocuments(query);

		res.status(200).json({ transactions, totalCount });
	} catch (error) {
		res.status(500).json({ message: "Error fetching transactions", error });
	}
};

// Fetch statistics for selected month
exports.getStatistics = async (req, res) => {
	const { month } = req.query; // Expected input: "01", "02", etc.

	try {
		const monthNumber = parseInt(month, 10); // Convert month to integer

		// Match transactions for the selected month, regardless of the year
		const totalSales = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }, // Match month only
					sold: true,
				},
			},
			{
				$group: {
					_id: null,
					totalAmount: { $sum: "$price" },
				},
			},
		]);

		const soldCount = await Transaction.countDocuments({
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
			sold: true,
		});

		const notSoldCount = await Transaction.countDocuments({
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
			sold: false,
		});

		res.status(200).json({
			totalSales: totalSales[0]?.totalAmount || 0,
			soldCount,
			notSoldCount,
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching statistics", error });
	}
};

// Bar chart data (price range counts by month)
exports.getBarChartData = async (req, res) => {
	const { month } = req.query; // Month number (01, 02, etc.)

	try {
		const monthNumber = parseInt(month, 10); // Convert month to integer

		// Aggregate data to get price ranges for the selected month
		const priceRanges = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }, // Match month only
				},
			},
			{
				$bucket: {
					groupBy: "$price",
					boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
					default: "Other",
					output: { count: { $sum: 1 } },
				},
			},
		]);

		res.status(200).json(priceRanges);
	} catch (error) {
		res.status(500).json({ message: "Error fetching bar chart data", error });
	}
};

// Pie chart data (category counts by month)
exports.getPieChartData = async (req, res) => {
	const { month } = req.query; // Month number (01, 02, etc.)

	try {
		const monthNumber = parseInt(month, 10); // Convert month to integer

		// Aggregate data to get category counts for the selected month
		const categories = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }, // Match month only
				},
			},
			{
				$group: { _id: "$category", count: { $sum: 1 } },
			},
		]);

		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: "Error fetching pie chart data", error });
	}
};

// Combined data (all statistics, transactions, bar chart, pie chart)
exports.getCombinedData = async (req, res) => {
	const { month } = req.query;

	try {
		const monthNumber = parseInt(month, 10);

		// Get transactions for the month
		const transactions = await Transaction.find({
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
		});

		// Get statistics
		const totalSales = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
					sold: true,
				},
			},
			{
				$group: { _id: null, totalAmount: { $sum: "$price" } },
			},
		]);

		const soldCount = await Transaction.countDocuments({
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
			sold: true,
		});

		const notSoldCount = await Transaction.countDocuments({
			$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
			sold: false,
		});

		// Get bar chart data
		const priceRanges = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
				},
			},
			{
				$bucket: {
					groupBy: "$price",
					boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
					default: "Other",
					output: { count: { $sum: 1 } },
				},
			},
		]);

		// Get pie chart data
		const categories = await Transaction.aggregate([
			{
				$match: {
					$expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
				},
			},
			{
				$group: { _id: "$category", count: { $sum: 1 } },
			},
		]);

		// Combine all data
		res.status(200).json({
			transactions,
			statistics: {
				totalSales: totalSales[0]?.totalAmount || 0,
				soldCount,
				notSoldCount,
			},
			barChart: priceRanges,
			pieChart: categories,
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching combined data", error });
	}
};
