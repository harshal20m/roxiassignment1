import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

function PieChartComponent({ pieChart }) {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg mb-8">
			<h2 className="text-2xl font-semibold text-gray-800 mb-4">Category Pie Chart</h2>
			<ResponsiveContainer width="100%" height={500}>
				<PieChart>
					<Pie
						data={pieChart}
						dataKey="count"
						nameKey="_id"
						outerRadius={150}
						fill="#8884d8"
						label={({ name, value }) => `${name}: ${value}`}
					>
						{pieChart.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FF6384" : "#36A2EB"} />
						))}
					</Pie>
					<Legend
						verticalAlign="top"
						align="center"
						iconSize={20}
						iconType="circle"
						wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px", fontSize: "14px" }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

export default PieChartComponent;
