import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCartFromLocalStorage = createAsyncThunk(
  "cart/loadCartFromLocalStorage",
  async () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  }
);

export const saveCartToLocalStorage = createAsyncThunk(
  "cart/saveCartToLocalStorage",
  async (cart, thunkAPI) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
);

const initialState = JSON.parse(localStorage.getItem("cart")) || [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const item = state.find((cartItem) => cartItem.id == action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.find((cartItem) => cartItem.id == action.payload);
      if (item.quantity === 1) {
        return cartSlice.caseReducers.removeItemFromCart(state, action);
      } else {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
      }
    },
    clearCart: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromLocalStorage.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  addItemToCart,
  increaseItemQuantity,
  removeItemFromCart,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export function getTotalCartQuantity(state) {
  return state.cart.reduce((sum, curr) => (sum += curr.quantity), 0);
}
export function getTotalCartPrice(state) {
  return state.cart.reduce((sum, curr) => (sum += curr.totalPrice), 0);
}
export const getItemQuantity = (id) => (state) => {
  return state.cart.find((item) => item.id == id)?.quantity ?? 0;
};
