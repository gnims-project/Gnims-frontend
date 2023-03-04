import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
