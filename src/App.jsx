import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import AllProducts from "./pages/Products/AllProducts";
import Login from "./pages/Auth/Login";
import AllCategories from "./pages/Categories/AllCategories";
import axios from "axios";
import { useEffect } from "react";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("login");
        }
    }, []);
    useEffect(() => {
        if (window.location.pathname === "/") {
            navigate("/products");
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<AllProducts />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/categories" element={<AllCategories />} />
            </Route>
        </Routes>
    );
};

export default App;
