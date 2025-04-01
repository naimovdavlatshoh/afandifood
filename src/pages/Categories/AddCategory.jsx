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

export function AddCategory({ changeStatus }) {
    const [open, setOpen] = useState(false);
    const [categoryNameUz, setCategoryNameUz] = useState("");
    const [categoryNameRu, setCategoryNameRu] = useState("");

    const lang = localStorage.getItem("lang");

    const handleOpen = () => setOpen(!open);

    const handleSubmit = () => {
        const data = {
            category_name_uz: categoryNameUz,
            category_name_ru: categoryNameRu,
        };
        PostDataTokenJson("api/category/create", data)
            .then((res) => {
                changeStatus();
                setOpen(false);

                toast.success(
                    localStorage.getItem("lang") == "ru"
                        ? "Добавлено"
                        : "Qo'shildi"
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
                className="py-2 px-5 bg-main text-white rounded-lg transition-colors duration-300 hover:bg-red-800"
            >
                {lang === "ru" ? "Добавить" : "Qo'shish"}
            </button>
            <Dialog open={open} handler={handleOpen} className="min-w-[300px]">
                <DialogHeader className="text-xl font-bold text-main">
                    {lang === "ru"
                        ? "Добавить категория"
                        : "Kategoriya qo'shish"}
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
