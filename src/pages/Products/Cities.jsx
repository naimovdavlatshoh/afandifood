import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { FaCity } from "react-icons/fa";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { GetDataSimple, PostDataTokenJson } from "../../service";
import { toast, Toaster } from "react-hot-toast";

export function Cities({ changeStatus, food }) {
    console.log(food);
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const lang = localStorage.getItem("lang");

    useEffect(() => {
        GetDataSimple("api/city/list").then((res) => {
            setCities(res);
        });
    }, []);

    const handleOpen = () => {
        setOpen(!open);
        setSelectedCity(null);
    };

    const handleCityClick = (city) => {
        setSelectedCity(city.id === selectedCity ? null : city.id);
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
                    toast.success(lang === "ru" ? "Добавлено" : "Qo'shildi");
                })
                .catch(() => {
                    setOpen(false);
                    setSelectedCity(null);
                    toast.error(
                        lang === "ru"
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
                    toast.success(lang === "ru" ? "Удалено" : "O'chirildi");
                })
                .catch(() => {
                    setOpen(false);
                    setSelectedCity(null);
                    toast.error(
                        lang === "ru"
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

            <Dialog open={open} handler={handleOpen} className="min-w-[300px]">
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
                        {cities.map((city) => {
                            const isSelected = selectedCity === city.id;
                            const isFoodCity = food?.cities?.some(
                                (c) => c.city_id === city.id
                            );

                            return (
                                <div
                                    key={city.id}
                                    className={`${
                                        isFoodCity
                                            ? "bg-main text-white"
                                            : "bg-white "
                                    } rounded-lg shadow-md hover:shadow-xl transition-shadow py-4 flex flex-col items-center cursor-pointer`}
                                    onClick={() => handleCityClick(city)}
                                >
                                    <FaCity
                                        size={24}
                                        className={`mb-2 ${
                                            isFoodCity
                                                ? "text-white"
                                                : "text-main"
                                        }`}
                                    />
                                    <span
                                        className={`font-medium text-xs ${
                                            isFoodCity ? "text-white" : ""
                                        }`}
                                    >
                                        {lang === "ru"
                                            ? city?.city_name_ru
                                            : city?.city_name_uz}
                                    </span>

                                    {isSelected && (
                                        <div className="mt-2 flex space-x-4">
                                            <BsCheckCircle
                                                onClick={() => addProduct()}
                                                size={20}
                                                className="text-green-500 cursor-pointer"
                                            />
                                            <BsXCircle
                                                onClick={() => removeProduct()}
                                                size={20}
                                                className={`${
                                                    isFoodCity
                                                        ? "text-white"
                                                        : "text-main"
                                                } cursor-pointer`}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
