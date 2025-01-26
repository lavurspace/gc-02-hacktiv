import { createBrowserRouter, redirect } from "react-router";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../views/HomePage";
import Categories from "../views/Categories";
import EditCuisine from "../views/EditCuisine";
import AddCuisine from "../views/AddCuisine";
import AddUser from "../views/AddUser";
import UpdateImage from "../views/UpdateImage";
import LoginPage from "../views/LoginPage";

const base_url = "https://h8-phase2-gc.vercel.app";

export const router = createBrowserRouter([
	{
		element: <BaseLayout />,
		loader: () => {
			if (!localStorage.access_token) {
				return redirect("/login");
			}

			return null;
		},
		children: [
			{
				path: "/",
				element: <HomePage base_url={base_url} />,
			},
			{
				path: "/categories",
				element: <Categories base_url={base_url} />,
			},
			{
				path: "/add-cuisine",
				element: <AddCuisine base_url={base_url} />,
			},
			{
				path: "/add-user",
				element: <AddUser base_url={base_url} />,
			},
			{
				path: "/edit/:id",
				element: <EditCuisine base_url={base_url} />,
			},
			{
				path: "/upload-image/:id",
				element: <UpdateImage base_url={base_url} />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage base_url={base_url} />,
		loader: () => {
			if (localStorage.access_token) {
				return redirect("/");
			}
			return null;
		},
	},
]);
