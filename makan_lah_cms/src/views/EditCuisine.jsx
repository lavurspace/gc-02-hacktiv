import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import CuisineForm from "../components/CuisineForm";

export default function EditCuisine({ base_url }) {
	const navigate = useNavigate();
	const { id } = useParams();
	const [initialData, setInitialData] = useState(null);
	const [loading, setLoading] = useState(false);

	async function fetchCuisine() {
		try {
			const { data } = await axios.get(
				`${base_url}/apis/restaurant-app/cuisines/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);
			setInitialData(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchCuisine();
	}, [id]);

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
			const { data } = await axios.put(
				`${base_url}/apis/restaurant-app/cuisines/${id}`,
				{ name, description, price, imgUrl, stock, categoryId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			Toastify({
				text: data.message || "Successfully updated cuisine",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#008000",
				},
			}).showToast();

			navigate("/");
		} catch (error) {
			Toastify({
				text: error.response?.data?.error || "Failed to update cuisine",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#FF0000",
				},
			}).showToast();
		} finally {
			setLoading(false);
		}
	}

	return (
		<CuisineForm
			base_url={base_url}
			formTitle="Edit Cuisine"
			buttonText="Save Changes"
			handleSubmit={handleSubmit}
			initialData={initialData}
			loading={loading}
		/>
	);
}
