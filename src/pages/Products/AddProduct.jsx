import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
    GetDataSimple,
    PostData,
    PostDataToken,
    PostDataTokenJson,
} from "../../service";
import { toast, Toaster } from "react-hot-toast";

export function AddProduct({ changeStatus }) {
    const [open, setOpen] = useState(false);
    const [productNameUz, setProductNameUz] = useState("");
    const [productNameRu, setProductNameRu] = useState("");
    const [productWeight, setProductWeight] = useState("");
    const [unitId, setUnitId] = useState(3);
    const [imageFile, setImageFile] = useState(null);
    const [imageId, setImageId] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const lang = localStorage.getItem("lang");

    useEffect(() => {
        GetDataSimple("api/category/list?page=1&limit=10").then((res) => {
            setCategories(res.result);
        });
    }, []);

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

    const uploadImage = () => {
        const formdata = new FormData();
        formdata.append("product_image", imageFile);
        PostDataToken("api/product/uploadimage", formdata)
            .then((res) => {
                setImageId(res.data.image_id);
                setError("");
                setSuccess(
                    localStorage.getItem("lang") == "ru"
                        ? "Изображение загружено"
                        : "Rasm yuklandi"
                );
            })
            .catch((err) => {
                setError(err.response.data.error);
                setSuccess("");
            });
    };

    const handleSubmit = () => {
        const data = {
            product_name_uz: productNameUz,
            product_name_ru: productNameRu,
            product_weight: productWeight,
            unit_id: parseInt(unitId),
            image_id: parseInt(imageId),
            category_id: parseInt(categoryId),
            price: parseInt(price),
        };
        PostDataTokenJson("api/product/create", data)
            .then((res) => {
                changeStatus();
                setOpen(false);
                setProductNameUz("");
                setProductNameRu("");
                setProductWeight("");
                setUnitId(3);
                setImageFile(null);
                setImageId(null);
                setCategoryId("");
                setPrice("");
                setError("");
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
                    {lang === "ru" ? "Добавить продукт" : "Mahsulot qo'shish"}
                </DialogHeader>
                <DialogBody
                    divider
                    className="space-y-4 p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-[50vh]"
                >
                    <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                            <Input
                                label={
                                    lang === "ru"
                                        ? "Название продукта (узб)"
                                        : "Mahsulot nomi (uz)"
                                }
                                value={productNameUz}
                                onChange={(e) =>
                                    setProductNameUz(e.target.value)
                                }
                            />
                            <Input
                                label={
                                    lang === "ru"
                                        ? "Название продукта (рус)"
                                        : "Mahsulot nomi (ru)"
                                }
                                value={productNameRu}
                                onChange={(e) =>
                                    setProductNameRu(e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label={
                                    lang === "ru"
                                        ? "Вес продукта (кг/литр)"
                                        : "Mahsulot og'irligi (kg/litr)"
                                }
                                value={productWeight}
                                onChange={(e) =>
                                    setProductWeight(e.target.value)
                                }
                            />
                            <Select
                                label={
                                    lang === "ru"
                                        ? "Единица измерения"
                                        : "O'lchov birligi"
                                }
                                value={unitId}
                                onChange={(value) => setUnitId(parseInt(value))}
                            >
                                <Option value={1}>
                                    {lang === "ru" ? "грамм" : "gram"}
                                </Option>
                                <Option value={2}>
                                    {lang === "ru" ? "литр" : "litr"}
                                </Option>
                                <Option value={3}>
                                    {lang === "ru" ? "кг" : "kg"}
                                </Option>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label={
                                    lang === "ru" ? "Категория" : "Kategoriya"
                                }
                                value={categoryId}
                                onChange={(value) => setCategoryId(value)}
                            >
                                {categories.map((category) => (
                                    <Option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {lang === "ru"
                                            ? category.category_name_ru
                                            : category.category_name_uz}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                label={lang === "ru" ? "Цена" : "Narx"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm mb-2">
                                {lang === "ru"
                                    ? "Загрузить изображение"
                                    : "Rasm yuklash"}
                            </label>
                            <div className="flex flex-col md:flex-row justify-center space-x-4 items-center min-h-[150px]">
                                <div className="border-2 border-dashed h-[105px] w-[200px] border-main rounded-lg p-6 cursor-pointer hover:bg-gray-200 flex ml-4 mb-2 md:mb-0 md:ml-0 flex-col items-center">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="fileInput"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <AiOutlineCloudUpload
                                            size={40}
                                            className="text-main mb-2"
                                        />
                                        {imageFile ? (
                                            <span className="text-main font-bold line-clamp-1 text-center">
                                                {imageFile.name}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </label>
                                </div>

                                {/* Image Preview */}
                                {imageFile && (
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-[200px] h-[105px] border-2 border-dashed border-gray-300 rounded-lg">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Image Preview"
                                                className="object-cover h-full w-[200px] rounded-lg"
                                            />
                                        </div>
                                        <button
                                            onClick={uploadImage}
                                            className="bg-main rounded-md md:rounded-xl  text-white font-bold py-3"
                                        >
                                            {localStorage.getItem("lang") ==
                                            "ru"
                                                ? "сохранить изображение"
                                                : "rasmni saqlash"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-500 text-sm mt-2 text-center">
                                {success}
                            </p>
                        )}
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
