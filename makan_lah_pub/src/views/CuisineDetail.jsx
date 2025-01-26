import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CuisineDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [cuisine, setCuisine] = useState(null);

	useEffect(() => {
		const fetchCuisineDetail = async () => {
			try {
				const response = await axios.get(
					`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`
				);
				setCuisine(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCuisineDetail();
	}, [id]);

	if (!cuisine) {
		return (
			<div className="min-h-screen bg-gray-50 flex justify-center items-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			
			<div className="container mx-auto px-4 py-24">
				<button
					className="mb-6 inline-flex items-center text-green-500 hover:text-green-600"
					onClick={() => navigate("/")}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
					</svg>
					Back to Home
				</button>

				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Image Section */}
						<div className="relative h-[400px] md:h-full">
							<img
								src={cuisine.imgUrl}
								alt={cuisine.name}
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>

						{/* Details Section */}
						<div className="p-8">
							<h1 className="text-3xl font-bold mb-4">{cuisine.name}</h1>
							<div className="space-y-4">
								<p className="text-gray-600">{cuisine.description}</p>
								
								<div className="flex items-center justify-between py-4 border-t border-gray-200">
									<span className="text-gray-600">Price</span>
									<span className="text-2xl font-bold text-green-500">
										Rp {cuisine.price.toLocaleString("id-ID")}
									</span>
								</div>

								<div className="py-4 border-t border-gray-200">
									<h3 className="text-lg font-semibold mb-3">Category</h3>
									<span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
										{cuisine.Category.name}
									</span>
								</div>

								<div className="py-4 border-t border-gray-200">
									<h3 className="text-lg font-semibold mb-3">Seller Information</h3>
									<div className="space-y-2">
										<p className="flex items-center">
											<span className="w-24 text-gray-600">Name:</span>
											<span className="font-medium">{cuisine.User.username}</span>
										</p>
										<p className="flex items-center">
											<span className="w-24 text-gray-600">Email:</span>
											<span className="font-medium">{cuisine.User.email}</span>
										</p>
										<p className="flex items-center">
											<span className="w-24 text-gray-600">Phone:</span>
											<span className="font-medium">{cuisine.User.phoneNumber}</span>
										</p>
										<p className="flex items-center">
											<span className="w-24 text-gray-600">Address:</span>
											<span className="font-medium">{cuisine.User.address}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CuisineDetail;
