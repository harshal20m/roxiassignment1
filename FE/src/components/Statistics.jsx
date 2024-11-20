function Statistics({ statistics, month }) {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg mb-8">
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics for {month}</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-green-100 p-6 rounded-lg shadow-md">
					<h3 className="font-bold text-lg">Total Sales</h3>
					<p className="text-2xl">${statistics.totalSales}</p>
				</div>
				<div className="bg-blue-100 p-6 rounded-lg shadow-md">
					<h3 className="font-bold text-lg">Sold Items</h3>
					<p className="text-2xl">{statistics.soldCount}</p>
				</div>
				<div className="bg-red-100 p-6 rounded-lg shadow-md">
					<h3 className="font-bold text-lg">Not Sold Items</h3>
					<p className="text-2xl">{statistics.notSoldCount}</p>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
