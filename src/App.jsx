import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AllProducts from "./pages/Products/AllProducts";
import Login from "./pages/Auth/Login";
import AllCategories from "./pages/Categories/AllCategories";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route path="/products" element={<AllProducts />} />
                <Route path="/categories" element={<AllCategories />} />
            </Route>
        </Routes>
    );
};

export default App;
