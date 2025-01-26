import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function Navbar() {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	useEffect(() => {
		// Add/remove modal classes to body
		if (showLogoutModal) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}

		return () => {
			document.body.classList.remove("modal-open");
		};
	}, [showLogoutModal]);

	const handleLogout = () => {
		// Clear any stored auth data (e.g., tokens)
		localStorage.removeItem("access_token");

		// Close modal and redirect to login page
		setShowLogoutModal(false);
		navigate("/login");
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid px-4">
					<Link to="/" className="navbar-brand d-flex align-items-center">
						<i className="bi bi-shop me-2"></i>
						MakanLah CMS
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link to="/categories" className="nav-link">
									<i className="bi bi-tags me-1"></i>
									Categories
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/add-cuisine" className="nav-link">
									<i className="bi bi-plus-circle me-1"></i>
									Add Cuisine
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/add-user" className="nav-link">
									<i className="bi bi-person-plus me-1"></i>
									Add User
								</Link>
							</li>
						</ul>

						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									onClick={() => setShowLogoutModal(true)}
									className="nav-link bg-transparent border-0"
									style={{ cursor: "pointer" }}
								>
									<i className="bi bi-box-arrow-right me-1"></i>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* Logout Confirmation Modal */}
			<div
				className={`modal fade ${showLogoutModal ? "show" : ""}`}
				style={{ display: showLogoutModal ? "block" : "none" }}
				tabIndex="-1"
				aria-hidden={!showLogoutModal}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Confirm Logout</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => setShowLogoutModal(false)}
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<p>Are you sure you want to logout?</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => setShowLogoutModal(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Modal Backdrop */}
			{showLogoutModal && (
				<div
					className="modal-backdrop fade show"
					onClick={() => setShowLogoutModal(false)}
				></div>
			)}
		</>
	);
}
