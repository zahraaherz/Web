import { setProducts, setError , setLoading , setpagination , setFavorite , setFavoriteToggled} from "../slices/product";
import axios from 'axios';


export const getProducts = (page, favouriteToggled ) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const {data} = await axios.get(`/api/products/${page}/${10}`)
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

export const addToFavorites = (id) => async (dispath, getState) => {
    const {product: {favorites}} = getState();
    const newFavorites = [...favorites, id];
    localStorage.setItem('favorites',JSON.stringify(newFavorites))
    dispath(setFavorite(newFavorites))

}

export const removeFromFavorites = (id) => async (dispath, getState) => {
    const {product: {favorites}} = getState();
    const newFavorites = favorites.filter((favoritesId) => favoritesId !== id )
    localStorage.setItem('favorites',JSON.stringify(newFavorites))
    dispath(setFavorite(newFavorites))

}
export const toggleFavorite = (toggle) => (dispatch, getState) => {
    const { product: { favorites, products } } = getState();
  
    if (toggle) {
      const filteredProducts = products.filter((product) => favorites.includes(product._id));
      dispatch(setFavoriteToggled(true));
      dispatch(setProducts(filteredProducts));
    } else {
      dispatch(setFavoriteToggled(false));
      dispatch(setProducts(1));
    }
  };
  