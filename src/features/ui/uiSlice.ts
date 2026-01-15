import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSidebarOpen: boolean;
  darkMode: boolean;
}

const initialState: UiState = {
  isSidebarOpen: true,
  darkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      // যখনি থিম চেঞ্জ হবে, আমরা HTML ট্যাগ-এ ক্লাস এড/রিমুভ করবো
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleSidebar, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;