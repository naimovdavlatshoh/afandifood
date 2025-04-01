import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";

const Layout = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const [showLanguages, setShowLanguages] = useState(false);
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();

    const handleChangeLanguage = (lang) => {
        localStorage.setItem("lang", lang);
        window.location.reload();
    };

    return (
        <>
            <div className="w-full h-screen lg:bg-main flex flex-col lg:flex-row">
                {/* Sidebar for large screens */}
                <div className="hidden lg:flex w-1/6 py-5 pl-5 justify-between flex-col">
                    <div>
                        <h1 className="text-2xl text-white font-bold mb-5">
                            Afandi Food
                        </h1>
                        <ul className="flex flex-col gap-3 text-lg">
                            <Link
                                to="/products"
                                className={`w-full hover:bg-white hover:text-main py-3 px-3 rounded-xl flex items-center gap-4 ${
                                    currentUrl == "/products"
                                        ? "bg-white text-main"
                                        : "text-white"
                                }`}
                            >
                                <IoFastFoodSharp size={20} />
                                <span>
                                    {localStorage.getItem("lang") == "ru"
                                        ? "Продукты"
                                        : "Mahsulotlar"}
                                </span>
                            </Link>
                            <Link
                                to="/categories"
                                className={`w-full hover:bg-white hover:text-main py-3 px-3 rounded-xl flex items-center gap-4 ${
                                    currentUrl == "/categories"
                                        ? "bg-white text-main"
                                        : "text-white"
                                }`}
                            >
                                <BiSolidCategory size={20} />
                                <span>
                                    {localStorage.getItem("lang") == "ru"
                                        ? "Категории"
                                        : "Kategoriyalar"}
                                </span>
                            </Link>
                        </ul>
                    </div>

                    {/* Language Buttons for Laptop */}
                    <div className="flex flex-col">
                        <div className="flex gap-3 mb-5">
                            <button
                                onClick={() => handleChangeLanguage("uz")}
                                className={`${
                                    lang == "uz"
                                        ? "bg-white text-main"
                                        : "text-white"
                                } px-4 py-2 rounded-lg `}
                            >
                                O'zbekcha
                            </button>
                            <button
                                onClick={() => handleChangeLanguage("ru")}
                                className={`${
                                    lang == "ru"
                                        ? "bg-white text-main"
                                        : "text-white"
                                } px-4 py-2 rounded-lg `}
                            >
                                Русский
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token"),
                                    navigate("/login");
                            }}
                            className={`${"bg-white text-main"} px-4 py-2 rounded-lg w-full`}
                        >
                            Выход
                        </button>
                    </div>
                </div>

                {/* Children */}
                <div className="flex-grow md:p-5">
                    <div className="bg-white h-full w-full overflow-y-scroll rounded-3xl p-5">
                        <Outlet />
                    </div>
                </div>

                {/* Bottombar for mobile devices */}
                <div className="lg:hidden fixed bottom-0 pb-5 left-0 w-full px-5 bg-white">
                    <div className="bg-main  rounded-2xl flex justify-between items-center relative h-[80px] p-2">
                        <div className="w-1/3 h-full ">
                            <Link
                                to="/products"
                                className={`${
                                    currentUrl == "/products"
                                        ? "text-main bg-white"
                                        : "text-white"
                                } flex flex-col items-center justify-center w-full h-full rounded-xl`}
                            >
                                <IoFastFoodSharp size={24} />
                                <span className="text-sm">
                                    {lang == "ru" ? "Продукты" : "Mahsulotlar"}
                                </span>
                            </Link>
                        </div>
                        <div className="w-1/3 h-full ">
                            <Link
                                to="/categories"
                                className={`${
                                    currentUrl == "/categories"
                                        ? "text-main bg-white"
                                        : "text-white"
                                } flex flex-col items-center justify-center w-full h-full rounded-xl`}
                            >
                                <BiSolidCategory size={24} />
                                <span className="text-sm">
                                    {lang == "ru"
                                        ? "Категории"
                                        : "Kategoriyalar"}
                                </span>
                            </Link>
                        </div>

                        {/* Speed Dial for Language Switcher */}
                        <div className="w-1/3 h-full flex justify-center items-center ">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowLanguages(!showLanguages)
                                    }
                                    className="text-white"
                                >
                                    <FaGlobe size={40} />
                                </button>
                                {showLanguages && (
                                    <div
                                        className={`absolute bottom-12 right-0 bg-white text-main rounded-lg shadow-lg flex flex-col`}
                                    >
                                        <button
                                            onClick={() =>
                                                handleChangeLanguage("uz")
                                            }
                                            className="py-3 px-8 hover:bg-gray-200"
                                        >
                                            O'zbekcha
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleChangeLanguage("ru")
                                            }
                                            className="py-3 px-8 hover:bg-gray-200"
                                        >
                                            Русский
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
