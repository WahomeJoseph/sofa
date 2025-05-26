import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: (() => {
            try {
                if (typeof window !== 'undefined') {
                    const storedCart = localStorage.getItem('cart');
                    return storedCart ? JSON.parse(storedCart) : [];
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            }
            return [];
        })()
    },

    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingProduct = state.items.find((items) => items.id === product.id)
            if (existingProduct) {
                if (existingProduct.quantity < existingProduct.stockQuantity) {
                    existingProduct.quantity += 1;
                }
            } else if (product.inStock && product.stockQuantity > 0) {
                state.items.push({
                    ...product,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                })
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, Math.min(quantity, item.stockQuantity));
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = []
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    }
})

export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state =>
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemCount = state =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartLoading = state => state.cart.loading;
export const selectCartError = state => state.cart.error;

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer