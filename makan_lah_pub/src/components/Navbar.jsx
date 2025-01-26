import { Link } from "react-router";

export default function Navbar({ searchQuery, setSearchQuery }) {
	return (
		<nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center">
						<span className="text-2xl font-bold text-green-500">Makan Lah</span>
					</Link>

					{/* Search Bar */}
					<div className="flex-1 max-w-2xl mx-8">
						<div className="relative">
							<input
								type="text"
								placeholder="Cari makanan favoritmu..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
							/>
							<button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Navigation Links */}
					<div className="flex items-center space-x-4">
						<Link to="#cart" className="text-gray-600 hover:text-green-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}

// Navbar.propTypes = {
// 	searchQuery: PropTypes.string.isRequired,
// 	setSearchQuery: PropTypes.func.isRequired,
// };
