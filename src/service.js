import axios from "axios";
import { useEffect } from "react";

export const BASE_URL = "https://afandicloud.uz/";

export const Token = localStorage.getItem("token");
export const Role = localStorage.getItem("role");

export const PostData = async (url, data) => {
    const response = await axios.post(BASE_URL + url, data);
    return response;
};

export const PostDataToken = async (url, data) => {
    const response = await axios.post(BASE_URL + url, data, {
        headers: {
            "Content-Type": "multipart/formData",
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};

export const PostDataTokenJson = async (url, data) => {
    const response = await axios.post(BASE_URL + url, data, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};

export const PostSimple = async (url) => {
    const response = await axios.post(
        BASE_URL + url,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
    return response;
};

export const GetDataSimple = async (url) => {
    if (Token) {
        const response = await axios.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } else {
        const response = await axios.get(BASE_URL + url);
        return response.data;
    }
};
export const GetDataSimpleUrl = async (url) => {
    if (Token) {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } else {
        const response = await axios.get(BASE_URL + url);
        return response.data;
    }
};

export const DeleteData = async (url) => {
    const response = await axios.delete(BASE_URL + url, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};
