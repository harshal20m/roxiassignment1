import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function BarChartComponent({ barChart }) {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg mb-8">
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">Price Range Bar Chart</h2>
			<ResponsiveContainer width="100%" height={400}>
				<BarChart data={barChart}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="_id" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#42A5F5" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export default BarChartComponent;
