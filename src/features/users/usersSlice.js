import { createSlice } from "@reduxjs/toolkit";

const getSelectedAddressIdFromLocalStorage = () => {
  const savedAddressId = localStorage.getItem("selectedAddressId");
  return savedAddressId ? JSON.parse(savedAddressId) : null;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    selectedAddressId: getSelectedAddressIdFromLocalStorage(),
  },
  reducers: {
    setAddress(state, action) {
      const id = action.payload.addressId ?? null;
      state.selectedAddressId = id;

      localStorage.setItem("selectedAddressId", JSON.stringify(id));
    },
  },
});

export default usersSlice.reducer;

export const { setAddress } = usersSlice.actions;

export const selectAddress = (state) => state.users.selectedAddressId;
