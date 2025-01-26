import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories({ base_url }) {
	const [categories, setCategories] = useState([]);

	async function fetchCategories() {
		try {
			const { data } = await axios.get(
				`${base_url}/apis/restaurant-app/categories`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col">
					<div className="card rounded-4 shadow">
						<div className="card-body p-4">
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h2 className="mb-0">Categories</h2>
							</div>
							<div className="table-responsive">
								<table className="table table-hover table-striped">
									<thead className="table-dark">
										<tr>
											<th className="text-center">ID</th>
											<th className="text-center">Category</th>
										</tr>
									</thead>
									<tbody>
										{categories.map((category) => (
											<tr key={category.id}>
												<td className="text-center align-middle">
													{category.id}
												</td>
												<td className="text-center align-middle">
													{category.name}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
