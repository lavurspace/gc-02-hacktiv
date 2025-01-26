import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function BaseLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 bg-light py-4">
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
