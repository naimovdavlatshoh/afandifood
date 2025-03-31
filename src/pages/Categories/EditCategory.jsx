import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { PostDataTokenJson } from "../../service";
import { toast, Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

export function EditCategory({ changeStatus, category }) {
    const [open, setOpen] = useState(false);
    const [categoryNameUz, setCategoryNameUz] = useState(
        category.category_name_uz
    );
    const [categoryNameRu, setCategoryNameRu] = useState(
        category.category_name_ru
    );

    const lang = localStorage.getItem("lang");

    const handleOpen = () => setOpen(!open);

    const handleSubmit = () => {
        const data = {
            category_name_uz: categoryNameUz,
            category_name_ru: categoryNameRu,

        };
        PostDataTokenJson(`api/category/update/${category.id}`, data)
            .then(() => {
                changeStatus();
                setOpen(false);
                toast.success(
                    localStorage.getItem("lang") == "ru"
                        ? "Редактировано"
                        : "O'zgartirildi"
                );
            })
            .catch((err) => {
                changeStatus();
                setOpen(false);
                toast.error(
                    localStorage.getItem("lang") == "ru"
                        ? "Что-то пошло не так! Пожалуйста, попробуйте еще раз"
                        : "Nimadir xatolik bo'ldi! Iltimos qayta urining"
                );
            });
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <button
                onClick={handleOpen}
                className="absolute top-2 right-2 p-2 text-main  rounded-xl hover:bg-red-800 hover:text-white"
            >
                <FaEdit />
            </button>
            <Dialog open={open} handler={handleOpen} className="min-w-[400px]">
                <DialogHeader className="text-xl font-bold text-main">
                    {lang === "ru"
                        ? "Редактировать категория"
                        : "Kategoriya o'zgartirish"}
                </DialogHeader>
                <DialogBody
                    divider
                    className="space-y-4 p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-[80vh]"
                >
                    <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label={
                                    lang === "ru"
                                        ? "Название категория (узб)"
                                        : "Kategoriya nomi (uz)"
                                }
                                defaultValue={categoryNameUz}
                                onChange={(e) =>
                                    setCategoryNameUz(e.target.value)
                                }
                            />
                            <Input
                                label={
                                    lang === "ru"
                                        ? "Название категория (рус)"
                                        : "Kategoriya nomi (ru)"
                                }
                                defaultValue={categoryNameRu}
                                onChange={(e) =>
                                    setCategoryNameRu(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="bg-gray-100 rounded-b-lg">
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        {lang === "ru" ? "Отменить" : "Bekor qilish"}
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={handleSubmit}
                    >
                        {lang === "ru" ? "Сохранить" : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
