import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    range: [],
    vendors: "",
    brands: "",
    search: "",
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters(state, action) {
      const { filterType, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.filters, filterType)) {
        let formattedValue = value;
        const excludedFilters = ["range", "search"];
        if (!excludedFilters.includes(filterType))
          formattedValue = value.join(",");

        state.filters[filterType] = formattedValue;
      }
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export default productSlice.reducer;

export const { setFilters, resetFilters } = productSlice.actions;

export const selectFilters = (state) => state.products.filters;
