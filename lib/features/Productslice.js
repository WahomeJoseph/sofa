import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('product') || '[]') : [],
        wishlist: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wishlist') || '[]') : []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingProduct = state.items.find((items) => items.id === product.id)
            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                state.items.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    material: product.material,
                    colorOptions: product.colorOptions,
                    seatingCapacity: product.seatingCapacity,
                    features: product.features,
                    stockQuantity: product.stockQuantity,
                    inStock: product.inStock,
                    brand: product.brand,
                    warranty: product.warranty,
                    reviews: product.reviews,
                    quantity: 1
                })
            }
            localStorage.setItem('product', JSON.stringify(state.items))
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find((item) => item.productId === productId);
            if (item && quantity >= 1) {
                item.quantity = Number(quantity);
            }
            localStorage.setItem('product', JSON.stringify(state.items));
        },

        // Wishlist actions
        addToWishList : (state, action) => {
            const product = action.payload;
            const existingProduct = state.wishlist.find((item) => item.id === product.id);
            if (existingProduct) {
                state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
                localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
            } else {
                state.wishlist.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    stockQuantity: product.stockQuantity,
                    inStock: product.inStock
                })
            }
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },

        removFromWishList: (state, action) => {
            const product = action.payload;
            state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },

        ifWishlisted: (state, action) => {
            const product = action.payload;
            const existingProduct = state.wishlist.find((item) => item.id === product.id);
            return !!existingProduct;
        },
        
        clearWishList: (state) => {
            state.wishlist = []
            localStorage.removeItem('wishlist', JSON.stringify(state.wishlist))
        }
    }
})

export const { addToCart, updateQuantity, addToWishList, clearWishList, ifWishlisted } = productSlice.actions
export default productSlice.reducer