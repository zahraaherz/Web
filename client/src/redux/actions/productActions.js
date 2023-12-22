import { setProducts, setError , setLoading , setpagination } from "../slices/product";
import axios from 'axios';


export const getProducts = (page, favouriteToggled ) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const {data} = await axios.get('/api/products')
        const {products, pagination } = data;
        dispatch(setProducts(products));
        dispatch(setpagination(pagination));
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data.message 
            ?  error.response.data.message 
            : error.message
            ? error.message
            : 'An Expected error has occured. Please try again later'
        ));
    }
}