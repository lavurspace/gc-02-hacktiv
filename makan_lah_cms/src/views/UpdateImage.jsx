import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

export default function UploadImage({ base_url }) {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [imageUpload, setImageUpload] = useState({});
	const [uploading, setUploading] = useState(false);

	const navigate = useNavigate();

	async function fetchImage() {
		try {
			const { data } = await axios.get(
				`${base_url}/apis/restaurant-app/cuisines/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				}
			);

			console.log(data.data, "<<<<<<<<<<<<<<<< ini di console log");

			setName(data.data.name);
			setImgUrl(data.data.imgUrl);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleImageSelect(event) {
		try {
			event.preventDefault();
			const image = event.target.files[0];
			setImageUpload(image);
			if (image) {
				const imgUrl = URL.createObjectURL(image);
				setImgUrl(imgUrl);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit(event) {
		try {
			setUploading(true);
			event.preventDefault();
			const formData = new FormData();
			formData.append("file", imageUpload);

			const { data } = await axios.patch(
				`${base_url}/apis/restaurant-app/cuisines/${id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			Toastify({
				text: `${data.message}`,
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

			navigate("/");
		} catch (error) {
			Toastify({
				text: error.response.data.error,
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
		} finally {
			setUploading(false);
		}
	}

	useEffect(() => {
		fetchImage();
	}, [id]);

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="card rounded-4 shadow-lg border-0">
						<div className="card-header bg-primary text-white p-4 rounded-top-4 border-0">
							<h4 className="mb-0 text-center">
								<i className="bi bi-image me-2"></i>
								Update Image
							</h4>
						</div>
						<div className="card-body p-4">
							<div className="row align-items-center">
								<div className="col-md-6 text-center mb-4 mb-md-0">
									<div className="position-relative">
										<img
											src={imgUrl || "https://via.placeholder.com/300"}
											alt={name}
											className="img-fluid rounded-3 shadow-sm"
											style={{ maxHeight: "300px", objectFit: "cover" }}
										/>
										{imgUrl && (
											<div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 text-white rounded-bottom-3">
												<small>{name}</small>
											</div>
										)}
									</div>
								</div>
								<div className="col-md-6">
									<div className="p-3">
										<h5 className="mb-3 text-secondary">
											<i className="bi bi-info-circle me-2"></i>
											Current Image Details
										</h5>
										<div className="mb-4">
											<p className="mb-1 text-muted small">Product Name</p>
											<p className="mb-3 fw-semibold">{name}</p>
											<p className="mb-1 text-muted small">Image Status</p>
											<div className="d-flex align-items-center">
												<div
													className={`badge ${
														imgUrl ? "bg-success" : "bg-warning"
													} me-2`}
												>
													{imgUrl ? "Image Uploaded" : "No Image"}
												</div>
											</div>
										</div>

										<form onSubmit={handleSubmit}>
											<div className="mb-4">
												<label className="form-label text-muted small">
													<i className="bi bi-upload me-1"></i>
													Select New Image
												</label>
												<input
													type="file"
													accept="image/*"
													onChange={handleImageSelect}
													className="form-control form-control-lg rounded-3"
												/>
											</div>

											<button
												type="submit"
												className="btn btn-primary w-100 rounded-3 py-3 position-relative"
												disabled={uploading}
											>
												{uploading ? (
													<>
														<div className="position-absolute start-50 translate-middle-x">
															<span
																className="spinner-border spinner-border-sm me-2"
																role="status"
																aria-hidden="true"
															></span>
															Uploading...
														</div>
													</>
												) : (
													<>
														<i className="bi bi-cloud-arrow-up me-2"></i>
														Save Changes
													</>
												)}
											</button>
										</form>
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
