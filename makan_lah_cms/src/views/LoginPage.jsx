import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";
import "../styles/login.css";

export default function LoginPage({ base_url }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigate();

	async function login(e) {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${base_url}/apis/login`, {
				email,
				password,
			});

			localStorage.setItem("access_token", data.data.access_token);
			navigation("/");
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
				onClick: function () {},
			}).showToast();
		}
	}

	return (
		<div className="min-vh-100 d-flex align-items-center justify-content-center login-page py-5">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-5">
						<div className="text-center mb-4">
							<i className="bi bi-shop display-1 text-primary logo-icon"></i>
							<h1 className="h3 mt-3 mb-2">Welcome to MakanLah CMS</h1>
							<p className="text-muted">Sign in to manage your restaurant</p>
						</div>

						<div className="card border-0 shadow-lg login-card">
							<div className="card-body p-4">
								<form onSubmit={login}>
									<div className="mb-3">
										<div className="input-group">
											<span className="input-group-text bg-white border-end-0">
												<i className="bi bi-envelope text-muted"></i>
											</span>
											<input
												type="email"
												className="form-control border-start-0 ps-0"
												placeholder="Email address"
												required
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
									</div>

									<div className="mb-4">
										<div className="input-group">
											<span className="input-group-text bg-white border-end-0">
												<i className="bi bi-lock text-muted"></i>
											</span>
											<input
												type="password"
												className="form-control border-start-0 ps-0"
												placeholder="Password"
												required
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
									</div>

									<div className="d-flex align-items-center justify-content-between mb-4">
										<div className="form-check">
											<input
												type="checkbox"
												className="form-check-input"
												id="remember"
											/>
											<label
												className="form-check-label text-muted"
												htmlFor="remember"
											>
												Remember me
											</label>
										</div>
										<a href="#" className="text-decoration-none small">
											Forgot password?
										</a>
									</div>

									<button
										type="submit"
										className="btn btn-primary w-100 py-2 fw-medium"
									>
										Sign In
									</button>
								</form>
							</div>
						</div>

						<div className="text-center mt-4">
							<p className="text-muted mb-0">
								Don't have an account?{" "}
								<a href="#" className="text-decoration-none">
									Contact admin
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
