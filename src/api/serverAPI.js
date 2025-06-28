// Calls your Flask backend
import { api } from "./index"; // your axios instance

export const addItem = (item) => api.post("/firebase/add", item);
export const removeItem = (id) =>
  api.post("/firebase/remove", { id }).then((res) => {
    res.data;
  });
export const getItems = () => api.post("/firebase/get").then((res) => res.data);
export const updateItem = (item) => api.post("/firebase/update", item);
