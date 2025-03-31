import React, { useState } from "react";
import {
    Input,
    Button,
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { PostData } from "../../service";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Функция для обработки нажатия на кнопку Войти
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Проверка формы
        if (!username || !password) {
            setError("Пожалуйста, заполните все поля.");
            setLoading(false);
            return;
        }

        const data = {
            login: username,
            password: password,
        };

        PostData("login", data)
            .then((response) => {
                console.log(response.status);
                if (response.status == 200) {
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("role", response.data.role_id);
                    window.location.href = "/products";
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("Ошибка при подключении к серверу.");
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-xl">
                <CardBody>
                    <Typography
                        variant="h4"
                        color="main"
                        className="text-center mb-6 text-main font-bold"
                    >
                        Вход в Afandi Food
                    </Typography>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            label="Имя пользователя"
                            type="text"
                            color="red"
                            size="lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            label="Пароль"
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color="red"
                        />

                        {error && (
                            <Typography
                                variant="small"
                                color="red"
                                className="text-center mt-2"
                            >
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-main hover:bg-main/90 transition mt-4"
                            disabled={loading}
                        >
                            {loading ? "Загрузка..." : "Войти"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
