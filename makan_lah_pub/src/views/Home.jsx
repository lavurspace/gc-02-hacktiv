import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

export default function Home() {
	const [cuisines, setCuisines] = useState([]);
	const [categories, setCategories] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [limit, setLimit] = useState(9);
	const [page, setPage] = useState(1);
	const [sortOrder, setSortOrder] = useState("ASC");
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();

	const fetchCuisines = async () => {
		try {
			const response = await axios.get(
				`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines`,
				{
					params: {
						q: searchQuery,
						i: categoryFilter,
						limit,
						page,
						sort: sortOrder,
					},
				}
			);

			setCuisines(response?.data?.data?.query);
			setTotalPages(response?.data?.data?.pagination?.totalPage);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await axios.get(
				`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/categories`
			);
			setCategories(response?.data?.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCuisines();
	}, [searchQuery, categoryFilter, limit, page, sortOrder]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const getPaginationRange = () => {
		const rangeSize = 5;
		const start = Math.max(1, page - Math.floor(rangeSize / 2));
		const end = Math.min(totalPages, start + rangeSize - 1);
		return Array.from({ length: end - start + 1 }, (_, index) => start + index);
	};

	const handleCardClick = (cuisineId) => {
		navigate(`/cuisine/${cuisineId}`);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<Banner />

			<div className="container mx-auto px-4 py-8">
				{/* Filters */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
					<div className="flex items-center space-x-2 text-sm text-gray-600">
						<span>Filter by:</span>
						<div className="relative">
							<select
								value={categoryFilter}
								onChange={(e) => setCategoryFilter(e.target.value)}
								className="appearance-none bg-transparent border-b-2 border-gray-200 hover:border-green-500 focus:border-green-500 py-1 pl-2 pr-8 focus:outline-none cursor-pointer transition-colors duration-200"
							>
								<option value="">All Categories</option>
								{categories.map((category) => (
									<option key={category.id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
							<div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="flex items-center space-x-2 text-sm text-gray-600">
						<span>Sort by:</span>
						<div className="relative">
							<select
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}
								className="appearance-none bg-transparent border-b-2 border-gray-200 hover:border-green-500 focus:border-green-500 py-1 pl-2 pr-8 focus:outline-none cursor-pointer transition-colors duration-200"
							>
								<option value="ASC">Price: Low to High</option>
								<option value="DESC">Price: High to Low</option>
							</select>
							<div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Cuisine Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cuisines.length > 0 ? (
						cuisines.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
								onClick={() => handleCardClick(item.id)}
							>
								<div className="relative pb-[66.67%]">
									<img
										src={item.imgUrl}
										alt={item.name}
										className="absolute top-0 left-0 w-full h-full object-cover"
									/>
								</div>
								<div className="p-4">
									<h3 className="font-semibold text-lg mb-2 line-clamp-2">
										{item.name}
									</h3>
									<p className="text-gray-600 text-sm mb-2 line-clamp-2">
										{item.description}
									</p>
									<div className="flex items-center justify-between">
										<span className="text-green-500 font-bold">
											Rp {item.price.toLocaleString("id-ID")}
										</span>
										<span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
											{item.Category.name}
										</span>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-full flex justify-center items-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
						</div>
					)}
				</div>

				{/* Pagination */}
				<div className="flex justify-center items-center mt-8 space-x-2">
					<button
						className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
						disabled={page === 1}
					>
						Previous
					</button>
					{getPaginationRange().map((pageNumber) => (
						<button
							key={pageNumber}
							className={`px-4 py-2 rounded-lg ${
								page === pageNumber
									? "bg-green-500 text-white"
									: "bg-white border border-gray-300 hover:bg-gray-50"
							}`}
							onClick={() => setPage(pageNumber)}
						>
							{pageNumber}
						</button>
					))}
					<button
						className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={page === totalPages}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
