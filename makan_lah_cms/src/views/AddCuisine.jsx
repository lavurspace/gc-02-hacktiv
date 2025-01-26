import { useState } from "react";
import { useNavigate } from "react-router";
import CuisineForm from "../components/CuisineForm";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddCuisine({ base_url }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(
		e,
		name,
		description,
		price,
		imgUrl,
		stock,
		categoryId
	) {
		e.preventDefault();
		setLoading(true);

		try {
			const { data } = await axios.post(
				`${base_url}/apis/restaurant-app/cuisines`,
				{ name, description, price, imgUrl, stock, categoryId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			Toastify({
				text: `${data.data.name} added successfully`,
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#008000",
				},
				onClick: function () {},
			}).showToast();

			navigate("/");
		} catch (error) {
			console.log(error);
			Toastify({
				text: error.response?.data?.error || "Failed to add cuisine",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#FF0000",
				},
				onClick: function () {},
			}).showToast();
		} finally {
			setLoading(false);
		}
	}

	return (
		<CuisineForm
			base_url={base_url}
			formTitle="Add New Cuisine"
			buttonText="Add Cuisine"
			handleSubmit={handleSubmit}
			loading={loading}
		/>
	);
}
