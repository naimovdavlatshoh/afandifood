import React, { useEffect, useState } from "react";
import { GetDataSimple } from "../../service";
import { BiSolidCategory } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight, FaCity, FaWallet } from "react-icons/fa";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";
import { Cities } from "./Cities";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
    const [foods, setFoods] = useState(null);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const changeStatus = () => {
        setStatus(!status);
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        GetDataSimple(
            `api/product/list?page=${currentPage}&limit=${itemsPerPage}`
        ).then((res) => {
            setFoods(res.result);
        });
    }, [status]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(foods?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = foods?.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!foods) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner color="red" className="h-12 w-12" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen md:p-6  overflow-y-scroll">
            <div className="flex justify-between items-center w-full mb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-main ">
                    {localStorage.getItem("lang") == "ru"
                        ? "Все продукты"
                        : "Barcha taomlar"}
                </h1>
                <AddProduct changeStatus={changeStatus} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 md:p-0">
                {currentFoods.map((food) => (
                    <div
                        key={food.id}
                        className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl"
                    >
                        <img
                            src={food.image_url}
                            alt={food.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 text-start">
                            <h2 className="text-xl font-semibold text-main line-clamp-1 mb-2">
                                {localStorage.getItem("lang") == "ru"
                                    ? food.product_name_ru
                                    : food.product_name_uz}
                            </h2>
                            <h2 className="text-sm font-semibold text-main line-clamp-1 flex items-center gap-2 mb-2">
                                <BiSolidCategory color="gray" size={15} />
                                <span className="text-gray-600">
                                    {localStorage.getItem("lang") == "ru"
                                        ? "Категория : "
                                        : "Kategoriya : "}
                                </span>
                                {localStorage.getItem("lang") == "ru"
                                    ? food.category_name_ru
                                    : food.category_name_uz}
                            </h2>
                            <h2 className="text-sm font-semibold text-main line-clamp-1 flex items-center gap-2">
                                <FaCity color="gray" size={15} />
                                <span className="text-gray-600">
                                    {localStorage.getItem("lang") == "ru"
                                        ? "Город : "
                                        : "Shahar : "}
                                </span>
                                <div className="flex flex-col">
                                    {food.cities.map((city, index) => (
                                        <>
                                            {city?.is_active == 1 ? (
                                                <span
                                                    key={index}
                                                    className="text-sm"
                                                >
                                                    {localStorage.getItem(
                                                        "lang"
                                                    ) == "ru"
                                                        ? city?.city_name_ru
                                                        : city?.city_name_ru}
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </>
                                    ))}
                                </div>
                            </h2>
                            <p className="text-main mt-2 flex items-center gap-2 font-semibold mb-3">
                                <FaWallet color="gray" />{" "}
                                <span className="text-gray-600">
                                    {localStorage.getItem("lang") == "ru"
                                        ? "Цена : "
                                        : "Narxi : "}
                                </span>
                                <span>{food.price}</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <EditProduct
                                    changeStatus={changeStatus}
                                    item={food}
                                />
                                <Cities
                                    changeStatus={changeStatus}
                                    food={food}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mb-[120px] md:mb-0 mt-5 md:mt-8 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-main text-white rounded-lg ${
                        currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-800"
                    }`}
                >
                    <FaArrowLeft />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded-lg ${
                            currentPage === index + 1
                                ? "bg-main text-white"
                                : "bg-white text-main border border-main hover:bg-main hover:text-white"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-main text-white rounded-lg ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-800"
                    }`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
