
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { playBackSound, playLightOnSound, playLightSound, playSuccessSound } from "../../Constants/sounds";

const initialState = {
    cartItems: [],
    totalAmout: 0,
    totalQuantity: 0,
    benefit: 0,
    shippingPrice: 10,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    images: newItem.images,
                    price: newItem.price,
                    benefit: newItem.benefit,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
                state.totalQuantity++;
                state.totalAmout += Number(newItem.price);


                playSuccessSound();
                toast.success("Product added successfully");
            } else {
                // existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
                state.totalAmout = state.cartItems.reduce(
                    (total, item) => total + Number(item.totalPrice),
                    0
                );
            }
        },
        deleteProduct: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id)
                state.totalQuantity -= existingItem.quantity;
                state.totalAmout = state.cartItems.reduce(
                    (total, item) => total + Number(item.totalPrice),
                    0
                );
            }
            playBackSound()
        },
        incrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            playLightSound()
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
                state.totalQuantity++;
                state.totalAmout =
                    state.totalAmout + Number(existingItem.price);

            }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id)

            if (existingItem && existingItem.quantity > 1) {
                playLightOnSound()
                existingItem.quantity--;
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
                state.totalQuantity--;
                state.totalAmout = state.totalAmout - Number(existingItem.price)
            }
        }
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;


