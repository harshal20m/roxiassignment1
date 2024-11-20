import { useEffect, useState } from "react";
import axios from "axios";
import SearchAndFilter from "./components/SearchAndFilter";
import Statistics from "./components/Statistics";
import TransactionTable from "./components/TransactionTable";
import Pagination from "./components/Pagination";
import BarChartComponent from "./components/BarChartComponent";
import PieChartComponent from "./components/PieChartComponent";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [statistics, setStatistics] = useState(null);
	const [barChart, setBarChart] = useState([]);
	const [pieChart, setPieChart] = useState([]);
	const [search, setSearch] = useState("");
	const [month, setMonth] = useState("10");
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchData = async () => {
		setLoading(true);
		try {
			const { data: transactionData } = await axios.get(
				`https://xtxe1hw4ia.execute-api.ap-south-1.amazonaws.com/api/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`
			);
			setTransactions(transactionData.transactions);
			setTotalCount(transactionData.totalCount);

			const { data: statData } = await axios.get(
				`https://xtxe1hw4ia.execute-api.ap-south-1.amazonaws.com/api/statistics?month=${month}`
			);
			setStatistics(statData);

			const { data: barData } = await axios.get(
				`https://xtxe1hw4ia.execute-api.ap-south-1.amazonaws.com/api/bar-chart?month=${month}`
			);
			setBarChart(barData);

			const { data: pieData } = await axios.get(
				`https://xtxe1hw4ia.execute-api.ap-south-1.amazonaws.com/api/pie-chart?month=${month}`
			);
			setPieChart(pieData);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [month, search, page, perPage]);

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">MERN Dashboard</h1>
					<p className="mt-2 text-lg text-gray-600">Track your transactions and sales data</p>
				</div>

				<SearchAndFilter search={search} setSearch={setSearch} month={month} setMonth={setMonth} />

				{loading ? (
					<div className="text-center text-3xl text-gray-500">Loading...</div>
				) : (
					<>
						{statistics && <Statistics statistics={statistics} month={month} />}
						{transactions.length > 0 && <TransactionTable transactions={transactions} />}
						<Pagination page={page} setPage={setPage} totalCount={totalCount} perPage={perPage} />
						<hr className="border-2 border-gray-300" />
						<h1 className="text-4xl mt-3 mb-3 font-extrabold text-gray-900 text-center tracking-tight">
							Charts
						</h1>
						{barChart.length > 0 && <BarChartComponent barChart={barChart} />}
						{pieChart.length > 0 && <PieChartComponent pieChart={pieChart} />}
					</>
				)}
			</div>
			<div className="flex flex-col justify-center items-center space-x-4 pt-3 pb-8 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-xl shadow-lg max-w-sm mx-auto">
				<div className="p-2 flex flex-col text-white">
					<h1 className="text-center font-bold text-2xl pb-3">Deployments</h1>
					<p className="text-center">
						{" "}
						Backend on <strong>AWS Lambda Function</strong>{" "}
					</p>
					<p className="text-center">
						{" "}
						Frontend on <strong>Netlify</strong>
					</p>
				</div>
				<div className="flex space-x-4">
					<a
						href="https://github.com/harshal20m"
						target="_blank"
						className="flex items-center px-6  bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-105"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="30"
							height="30"
							viewBox="0 0 64 64"
						>
							<circle cx="32" cy="32" r="23" fill="#9c34c2"></circle>
							<ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse>
							<path
								fill="#fff"
								d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9	C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z"
								opacity=".3"
							></path>
							<path
								fill="none"
								stroke="#fff"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-miterlimit="10"
								stroke-width="3"
								d="M15.047,23.427c1.878-3.699,4.932-6.705,8.666-8.522"
							></path>
							<path
								fill="#a0effe"
								d="M37.184,43.111c4.556-1.02,7.818-3.645,7.818-9.252c0-2.6-0.787-4.556-1.97-6.011	c-0.273-0.336-0.274-1.056-0.162-1.474c0.281-1.043,0.066-2.404-0.17-3.383c-0.177-0.73-0.94-1.156-1.662-0.949	c-1.707,0.491-3.115,1.466-4.138,2.136c-0.279,0.182-0.602,0.255-0.931,0.203c-1.244-0.197-2.581-0.282-3.964-0.302L32,24.113V24.08	c-1.383,0.02-2.72,0.105-3.964,0.302c-0.329,0.052-0.652-0.021-0.931-0.203c-1.023-0.669-2.431-1.644-4.138-2.136	c-0.721-0.208-1.485,0.219-1.662,0.949c-0.237,0.979-0.451,2.341-0.17,3.383c0.113,0.418,0.112,1.138-0.162,1.474	c-1.183,1.455-1.97,3.41-1.97,6.011c0,5.607,3.261,8.232,7.818,9.252c0.774,0.173,0.843,1.018,0.544,1.753	c-0.236,0.582-0.368,1.009-0.368,1.677v0.315c-0.168,0.046-0.342,0.087-0.53,0.111c-1.142,0.147-1.98,0-2.559-0.343	c-0.58-0.343-1.267-0.909-1.783-1.662c-0.435-0.635-1.375-2.003-3.596-1.949c-0.388-0.01-0.565,0.354-0.516,0.581	c0.044,0.2,0.22,0.516,0.924,0.773c0.706,0.259,1.169,0.788,1.556,1.411c0.431,0.695,0.693,2.143,2.196,3.218	c0.901,0.644,2.078,1.036,2.954,0.996c0.742-0.034,1.355,0.574,1.355,1.317l0.001,1.628c0,0.659-0.603,1.326-1.228,1.21	c1.854,0.624,4.129,0.813,6.229,0.84v-0.047l0.005,0.047c2.1-0.026,4.375-0.216,6.229-0.84c-0.625,0.115-1.228-0.552-1.228-1.21	l0.002-6.396c0-0.668-0.132-1.095-0.368-1.677C36.342,44.13,36.41,43.285,37.184,43.111z"
							></path>
							<path
								d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18	c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z"
								opacity=".15"
							></path>
						</svg>
						&nbsp; GitHub
					</a>

					<a
						href="https://www.harshalmali.online"
						target="_blank"
						className="flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
					>
						&lt;HM&#47;&gt;
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
