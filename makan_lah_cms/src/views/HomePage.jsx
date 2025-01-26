import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function HomePage({ base_url }) {
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState([]);
	const navigate = useNavigate();

	async function fetchCuisine() {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`${base_url}/apis/restaurant-app/cuisines`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);
			setProduct(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	function priceBeingRupiah(price) {
		const formatter = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			maximumFractionDigits: 0,
		});

		return formatter.format(price);
	}

	function handleEdit(e, id) {
		e.preventDefault();
		navigate(`/edit/${id}`);
	}

	async function handleDelete(e, id) {
		e.preventDefault();
		try {
			await axios.delete(`${base_url}/apis/restaurant-app/cuisines/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.access_token}`,
				},
			});
			Toastify({
				text: "Successfully deleted cuisine",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#4CAF50",
				},
			}).showToast();
			fetchCuisine(); // Refresh the list after deletion
		} catch (error) {
			console.log(error);
			Toastify({
				text: error.response?.data?.error || "Failed to delete cuisine",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				style: {
					background: "#ff4d4f",
				},
			}).showToast();
		}
	}

	useEffect(() => {
		fetchCuisine();
	}, []);

	return (
		<div className="container mt-4">
			{loading ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ minHeight: "60vh" }}
				>
					<div className="text-center">
						<div
							className="spinner-grow text-primary"
							role="status"
							style={{ width: "3rem", height: "3rem" }}
						>
							<span className="visually-hidden">Loading...</span>
						</div>
						<div className="mt-3">
							<div
								className="spinner-grow text-primary mx-1"
								role="status"
								style={{ width: "1rem", height: "1rem" }}
							>
								<span className="visually-hidden">Loading...</span>
							</div>
							<div
								className="spinner-grow text-primary mx-1"
								role="status"
								style={{
									width: "1rem",
									height: "1rem",
									animationDelay: "0.1s",
								}}
							>
								<span className="visually-hidden">Loading...</span>
							</div>
							<div
								className="spinner-grow text-primary mx-1"
								role="status"
								style={{
									width: "1rem",
									height: "1rem",
									animationDelay: "0.2s",
								}}
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						<p className="mt-3 fw-semibold text-primary">
							Loading your cuisines...
						</p>
					</div>
				</div>
			) : (
				<div className="card rounded-4 shadow">
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-hover table-striped rounded overflow-hidden">
								<thead className="table-dark">
									<tr>
										<th className="rounded-start-3"></th>
										<th>Name</th>
										<th>Description</th>
										<th>Price</th>
										<th>Category</th>
										<th className="rounded-end-3">Actions</th>
									</tr>
								</thead>
								<tbody>
									{product
										.slice()
										.reverse()
										.map((el, index) => {
											return (
												<tr key={el.id}>
													<td>
														<div className="text-center">
															<img
																src={el.imgUrl}
																alt={el.name}
																className="rounded-3"
																style={{
																	width: "50px",
																	height: "50px",
																	objectFit: "cover",
																}}
															/>
														</div>
													</td>
													<td className="align-middle">
														<span className="fw-semibold">{el.name}</span>
													</td>
													<td className="align-middle">
														<p className="mb-0" style={{ maxWidth: "300px" }}>
															{el.description}
														</p>
													</td>
													<td className="align-middle">
														{priceBeingRupiah(el.price)}
													</td>
													<td className="align-middle">{el.category}</td>
													<td className="align-middle">
														<div className="d-flex gap-2">
															<button
																className="btn btn-primary btn-sm rounded-3"
																onClick={(event) => handleEdit(event, el.id)}
															>
																Edit
															</button>
															<button
																className="btn btn-danger btn-sm rounded-3"
																onClick={(event) => handleDelete(event, el.id)}
															>
																Delete
															</button>
															<Link
																to={`/upload-image/${el.id}`}
																className="btn btn-warning btn-sm rounded-3"
															>
																<i className="bi bi-upload"></i>
															</Link>
														</div>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
