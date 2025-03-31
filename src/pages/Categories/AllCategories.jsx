import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaUtensils, FaEdit } from "react-icons/fa";

import { GetDataSimple } from "../../service";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
    const [status, setStatus] = useState(false);
    const [categories, setCategories] = useState(null);
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
            `api/category/list?page=${currentPage}&limit=${itemsPerPage}`
        ).then((res) => {
            setCategories(res.result);
        });
    }, [status]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(categories?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = categories?.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!categories) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner color="red" className="h-12 w-12" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen md:p-6 overflow-y-scroll">
            <div className="flex justify-between items-center w-full mb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-main ">
                    {localStorage.getItem("lang") == "ru"
                        ? "Все категории"
                        : "Hamma kategoriyalar"}
                </h1>
                <AddCategory changeStatus={changeStatus} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all relative"
                    >
                        <div className="text-4xl text-main mb-4 flex justify-center">
                            <FaUtensils />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 text-center">
                            {localStorage.getItem("lang") == "ru"
                                ? category.category_name_ru
                                : category.category_name_uz}
                        </h3>
                        {/* Edit Button */}
                        <EditCategory
                            changeStatus={changeStatus}
                            category={category}
                        />
                    </div>
                ))}
            </div>
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

export default AllCategories;
