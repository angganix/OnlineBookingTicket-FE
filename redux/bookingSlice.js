import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  orders: {
    concert_id: 0,
    detail_orders: [],
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    addBooking: (state, action) => {
      state.list = [...state.list, action.payload];
      state.orders = {
        ...state.orders,
        concert_id: Number(action.payload.concert_id),
        detail_orders: [
          ...state.orders?.detail_orders,
          {
            ticket_id: action.payload?.id,
            person_name: "",
          },
        ],
      };
    },
    removeBooking: (state, action) => {
      const updatedBooking = state.list.filter(
        (item) => item?.id !== action?.payload?.id
      );
      const updateOrders = state.orders?.detail_orders?.filter(
        (item) => item?.ticket_id !== action?.payload?.id
      );
      state.list = updatedBooking;
      state.orders = {
        ...state?.orders,
        concert_id: updateOrders.length ? state.orders.concert_id : 0,
        detail_orders: updateOrders,
      };
    },
  },
});

export const { addBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
