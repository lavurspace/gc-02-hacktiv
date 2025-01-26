import { useEffect, useState } from "react";
import axios from "axios";

export default function CuisineForm({
	base_url,
	formTitle,
	buttonText,
	handleSubmit,
	initialData,
	loading = false
}) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [categoryId, setCategoryId] = useState("");
	const [categories, setCategories] = useState([]);

	async function fetchCategories() {
		try {
			const { data } = await axios.get(
				`${base_url}/apis/restaurant-app/categories`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);
			setCategories(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if (initialData) {
			setName(initialData.name || "");
			setDescription(initialData.description || "");
			setImgUrl(initialData.imgUrl || "");
			setPrice(initialData.price || 0);
			setStock(initialData.stock || 0);
			setCategoryId(initialData.categoryId || "");
		}
	}, [initialData]);

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="card border-0 rounded-4 shadow-lg">
						<div className="card-header bg-primary text-white p-4 rounded-top-4 border-0">
							<h4 className="mb-0 text-center">
								<i className="bi bi-plus-circle me-2"></i>
								{formTitle}
							</h4>
						</div>
						<div className="card-body p-4">
							<form onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(e, name, description, price, imgUrl, stock, categoryId);
							}}>
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input
												type="text"
												name="name"
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder="Enter cuisine name"
												className="form-control"
												required
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Category</label>
											<select
												name="categoryId"
												value={categoryId}
												onChange={(e) => setCategoryId(Number(e.target.value))}
												className="form-select"
												required
											>
												<option value="">Select a category</option>
												{categories.map((category) => (
													<option key={category.id} value={category.id}>
														{category.name}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea
										name="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Enter cuisine description"
										className="form-control"
										style={{ height: "100px" }}
										required
									/>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Price</label>
											<input
												type="number"
												name="price"
												value={price}
												onChange={(e) => setPrice(Number(e.target.value))}
												placeholder="Enter price"
												className="form-control"
												required
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Stock</label>
											<input
												type="number"
												name="stock"
												value={stock}
												onChange={(e) => setStock(Number(e.target.value))}
												placeholder="Enter stock quantity"
												className="form-control"
												required
											/>
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label className="form-label">Image URL</label>
									<input
										type="text"
										name="imgUrl"
										value={imgUrl}
										onChange={(e) => setImgUrl(e.target.value)}
										placeholder="Enter image URL"
										className="form-control"
										required
									/>
								</div>

								<button
									type="submit"
									className="btn btn-primary w-100"
									disabled={loading}
								>
									{loading ? (
										<>
											<span
												className="spinner-border spinner-border-sm me-2"
												role="status"
												aria-hidden="true"
											></span>
											Loading...
										</>
									) : (
										<>
											<i className="bi bi-plus-circle me-2"></i>
											{buttonText}
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
