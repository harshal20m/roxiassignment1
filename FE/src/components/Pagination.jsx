function Pagination({ page, setPage, totalCount, perPage }) {
	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= Math.ceil(totalCount / perPage)) {
			setPage(newPage);
		}
	};

	return (
		<div className="flex justify-between items-center mb-8 mt-2">
			<button
				className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
				onClick={() => handlePageChange(page - 1)}
				disabled={page === 1}
			>
				Previous
			</button>
			<span className="text-lg text-gray-700">
				Page {page} of {Math.ceil(totalCount / perPage)}
			</span>
			<button
				className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
				onClick={() => handlePageChange(page + 1)}
				disabled={page === Math.ceil(totalCount / perPage)}
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
