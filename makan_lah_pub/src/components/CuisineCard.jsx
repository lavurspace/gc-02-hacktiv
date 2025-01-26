import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export default function CuisineCard({ cuisine }) {
	const navigate = useNavigate();

	return (
		<div
			className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
			onClick={() => navigate(`/cuisine/${cuisine.id}`)}
		>
			<div className="relative pb-[66.67%]">
				<img
					src={cuisine.imgUrl}
					alt={cuisine.name}
					className="absolute top-0 left-0 w-full h-full object-cover"
				/>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-2 line-clamp-2">
					{cuisine.name}
				</h3>
				<p className="text-gray-600 text-sm mb-2 line-clamp-2">
					{cuisine.description}
				</p>
				<div className="flex items-center justify-between">
					<span className="text-green-500 font-bold">
						Rp {cuisine.price.toLocaleString("id-ID")}
					</span>
					<span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
						{cuisine.Category.name}
					</span>
				</div>
			</div>
		</div>
	);
}

CuisineCard.propTypes = {
	cuisine: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		imgUrl: PropTypes.string.isRequired,
		Category: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};
