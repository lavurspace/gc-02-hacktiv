import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home";
import CuisineDetail from "./views/CuisineDetail";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cuisine/:id" element={<CuisineDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
