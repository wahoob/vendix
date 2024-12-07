import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    range: [],
    vendors: "",
    brands: "",
    search: "",
  },
  ui: {
    showSearch: false,
    isInputFocused: false,
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

    showSearchResults(state) {
      state.ui.showSearch = true;
      state.ui.isInputFocused = true;
    },
    hideSearchResults(state) {
      state.ui.showSearch = false;
      state.ui.isInputFocused = false;
    },
  },
});

export default productSlice.reducer;

export const {
  setFilters,
  resetFilters,
  showSearchResults,
  hideSearchResults,
} = productSlice.actions;

export const selectFilters = (state) => state.products.filters;
export const selectProductsUI = (state) => state.products.ui;
