import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddUser({ base_url }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const navigate = useNavigate();

	async function handleSubmit(
		e,
		username,
		email,
		password,
		phoneNumber,
		address
	) {
		e.preventDefault();
		try {
			const body = { username, email, password, phoneNumber, address };

			const { data } = await axios.post(`${base_url}/apis/add-user`, body, {
				headers: {
					Authorization: `Bearer ${localStorage.access_token}`,
				},
			});
			console.log(data);

			Toastify({
				text: `Success add new user`,
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
			console.log(error);
			Toastify({
				text: error.response.data.error,
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
		}
	}

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="card rounded-4 shadow-lg border-0">
						<div className="card-header bg-primary text-white p-4 rounded-top-4 border-0">
							<h4 className="mb-0 text-center">
								<i className="bi bi-person-plus me-2"></i>
								Add New User (Staff)
							</h4>
						</div>
						<div className="card-body p-4">
							<form
								onSubmit={(e) =>
									handleSubmit(
										e,
										username,
										email,
										password,
										phoneNumber,
										address
									)
								}
							>
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="username" className="form-label">
												Username
											</label>
											<input
												type="text"
												name="username"
												className="form-control rounded-3"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												placeholder="Enter username"
												required
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												Email
											</label>
											<input
												type="email"
												name="email"
												className="form-control rounded-3"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Enter email"
												required
											/>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="password" className="form-label">
												Password
											</label>
											<input
												type="password"
												name="password"
												className="form-control rounded-3"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Enter password"
												required
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="phoneNumber" className="form-label">
												Phone Number
											</label>
											<input
												type="tel"
												name="phoneNumber"
												className="form-control rounded-3"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												placeholder="Enter phone number"
												required
											/>
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="address" className="form-label">
										Address
									</label>
									<textarea
										name="address"
										className="form-control rounded-3"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										placeholder="Enter address"
										rows="3"
										required
									></textarea>
								</div>

								<button
									type="submit"
									className="btn btn-primary w-100 rounded-3 py-3"
								>
									<i className="bi bi-person-plus me-2"></i>
									Add User
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
