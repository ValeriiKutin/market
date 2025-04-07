import { getSportStuff } from "../api/api"
import { setProducts } from "../store/productSlice"

export const refreshProducts = async (dispatch: any) => {
    try {
        const res = await getSportStuff()
        dispatch(setProducts(res.data))
    } catch (error) {
        console.error(error)
    }
}