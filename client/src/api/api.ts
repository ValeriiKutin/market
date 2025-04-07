import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getSportStuff = () => api.get("/sportstuff");
export const getSportItemById = (id: string) => api.get(`/sportstuff?id=${id}`);
export const createSportProduct = (formData: FormData) =>
    api.post("/sportstuff", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const getUserByUid = (uid: string) => api.get(`/users?uid=${uid}`);
export const deleteSportItemById = (id: string) => api.delete(`/sportstuff/${id}`)
export const updateSportItemById = (id: string, updatedProduct: any) => api.put(`/sportstuff/${id}`, updatedProduct)