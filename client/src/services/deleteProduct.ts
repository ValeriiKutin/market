import { deleteSportItemById } from "../api/api"
import { refreshProducts } from "./refreshProducts"

export const deleteProduct = async (id: string, dispatch: any) => {
    await deleteSportItemById(id)
    await refreshProducts(dispatch)
}