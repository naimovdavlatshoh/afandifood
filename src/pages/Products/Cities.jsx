import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { BsCheckCircle, BsXCircle } from "react-icons/bs"; // For the true/false icons
import { GetDataSimple, PostDataTokenJson } from "../../service";
import { toast, Toaster } from "react-hot-toast";

export function Cities({ changeStatus, food }) {
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null); // State to track selected city
    const lang = localStorage.getItem("lang");

    useEffect(() => {
        GetDataSimple("api/city/list").then((res) => {
            setCities(res);
            console.log(res);
        });
    }, []);

    const handleOpen = () => {
        setOpen(!open), setSelectedCity(null);
    };

    const handleCityClick = (city) => {
        setSelectedCity(city.id === selectedCity ? null : city.id); // Toggle the selected city
    };

    const addProduct = () => {
        if (selectedCity) {
            PostDataTokenJson(`api/product/addcity/${food.product_id}`, {
                city_id: selectedCity,
            })
                .then((res) => {
                    changeStatus();
                    setOpen(false);
                    setSelectedCity(null);
                    toast.success(
                        localStorage.getItem("lang") == "ru"
                            ? "Добавлено"
                            : "Qo'shildi"
                    );
                })
                .catch(() => {
                    setOpen(false);
                    setSelectedCity(null);
                    toast.error(
                        localStorage.getItem("lang") == "ru"
                            ? "Что-то пошло не так!"
                            : "Nimadir xato ketdi!"
                    );
                });
        }
    };
    const removeProduct = () => {
        if (selectedCity) {
            PostDataTokenJson(`api/product/delcity/${food.product_id}`, {
                city_id: selectedCity,
            })
                .then(() => {
                    changeStatus();
                    setOpen(false);
                    setSelectedCity(null);
                    toast.success(
                        localStorage.getItem("lang") == "ru"
                            ? "Добавлено"
                            : "Qo'shildi"
                    );
                })
                .catch((err) => {
                    setOpen(false);
                    setSelectedCity(null);
                    toast.error(
                        localStorage.getItem("lang") == "ru"
                            ? "Что-то пошло не так!"
                            : "Nimadir xato ketdi!"
                    );
                });
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <button
                onClick={handleOpen}
                className="py-2 px-2 bg-white border-2 border-main text-main rounded-lg transition-colors duration-300 hover:bg-red-800 hover:text-white"
            >
                <FaCity size={20} />
            </button>

            <Dialog open={open} handler={handleOpen} className="min-w-[400px]">
                <DialogHeader className="text-xl font-bold text-main">
                    {lang === "ru"
                        ? `Добавить товар в город`
                        : "Mahsulotni shaharga qo'shish"}
                </DialogHeader>
                <DialogBody
                    divider
                    className="space-y-4 p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-[50vh]"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cities.map((city) => (
                            <div
                                key={city.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow py-4 flex flex-col items-center cursor-pointer"
                                onClick={() => handleCityClick(city)} // Click handler
                            >
                                <FaCity size={24} className="text-main mb-2" />
                                <span className="font-medium text-xs">
                                    {lang === "ru"
                                        ? city?.city_name_ru
                                        : city?.city_name_uz}
                                </span>

                                {selectedCity === city.id && ( // Show icons only if city is selected
                                    <div className="mt-2 flex space-x-4">
                                        <BsCheckCircle
                                            onClick={() => addProduct()}
                                            size={20}
                                            className="text-green-500 cursor-pointer"
                                        />
                                        <BsXCircle
                                            onClick={() => removeProduct()}
                                            size={20}
                                            className="text-red-500 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter className="bg-gray-100 rounded-b-lg">
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        {lang === "ru" ? "закрыть" : "Yopish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
