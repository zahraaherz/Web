import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    loading : false, 
    error : null, 
    products: [],
    product: null,
    pagination: {},
    favoriteToggled: true, 
    favorites: JSON.parse(localStorage.getItem('favorites')) ?? [],
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state) =>{
            state.loading = true;
        },
        setProducts: (state,{payload}) => {
            state.loading = false;
            state.error = null;
            state.products = payload;

        },
        setError: (state,{payload}) => {
            state.loading = false;
            state.error = payload;
        },
        setpagination: (state,{payload}) => {
            state.loading = false;
            state.error = null;
            state.pagination = payload;
        },
        setFavorite: (state,{payload}) => {
            state.favorites =  payload;
        },
        setFavoriteToggled: (state,{payload}) => {
            state.favoriteToggled =  payload;
        },
    }
})

export const {
    setLoading, setError , setProducts , setpagination , setFavorite , setFavoriteToggled
} = productsSlice.actions ; 

export default productsSlice.reducer

export const productSelector = (state) => state.products;