import { useState, useEffect } from "react";
import Form, { FormGroup, FormInput, FormSelect } from "./Form";

export default function UserForm({
	formTitle,
	buttonText,
	handleSubmit,
	initialData,
	loading = false,
}) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		if (initialData) {
			setUsername(initialData.username || "");
			setEmail(initialData.email || "");
			setPassword(initialData.password || "");
			setRole(initialData.role || "");
			setPhoneNumber(initialData.phoneNumber || "");
		}
	}, [initialData]);

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="card rounded-4 shadow-lg border-0">
						<div className="card-header bg-primary text-white p-4 rounded-top-4 border-0">
							<h4 className="mb-0 text-center">
								<i className="bi bi-person-plus me-2"></i>
								{formTitle}
							</h4>
						</div>
						<div className="card-body p-4">
							<Form
								onSubmit={(e) =>
									handleSubmit(e, username, email, password, role, phoneNumber)
								}
							>
								<div className="row">
									<div className="col-md-6">
										<FormGroup label="Username">
											<FormInput
												name="username"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												placeholder="Enter username"
												className="rounded-3"
												required
											/>
										</FormGroup>
									</div>
									<div className="col-md-6">
										<FormGroup label="Email">
											<FormInput
												type="email"
												name="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Enter email"
												className="rounded-3"
												required
											/>
										</FormGroup>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<FormGroup label="Password">
											<FormInput
												type="password"
												name="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Enter password"
												className="rounded-3"
												required
											/>
										</FormGroup>
									</div>
									<div className="col-md-6">
										<FormGroup label="Phone Number">
											<FormInput
												type="tel"
												name="phoneNumber"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												placeholder="Enter phone number"
												className="rounded-3"
												required
											/>
										</FormGroup>
									</div>
								</div>

								<FormGroup label="Role">
									<FormSelect
										name="role"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className="rounded-3"
										required
									>
										<option value="">Select a role</option>
										<option value="admin">Admin</option>
										<option value="staff">Staff</option>
									</FormSelect>
								</FormGroup>

								<button
									type="submit"
									className="btn btn-primary w-100 rounded-3 py-3"
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
											<i className="bi bi-person-plus me-2"></i>
											{buttonText}
										</>
									)}
								</button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
