import { createSlice } from "@reduxjs/toolkit";

const getInitialSidebarState = () => {
  if (window.innerWidth < 1200) {
    return false;
  }
  return true;
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: getInitialSidebarState(),
  },
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default sidebarSlice.reducer;

export const { toggleSidebar } = sidebarSlice.actions;

export const selectSidebar = (state) => state.sidebar;
