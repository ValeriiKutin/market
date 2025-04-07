import { updateSportItemById } from "../api/api";
import { refreshProducts } from "./refreshProducts";
import { toast } from "react-toastify"; 
export const editProduct = async (id: string, updatedProduct: any, dispatch: any) => {
    try {
        await updateSportItemById(id, updatedProduct);
        await refreshProducts(dispatch);
        // Show success notification
        toast.success("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error);
        // Show error notification
        toast.error("Failed to update product. Please try again.");
        throw error;
    }
}