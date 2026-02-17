import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalType: string | null;
  modalProps: Record<string, any>;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  modalOpen: false,
  modalType: null,
  modalProps: {},
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; props?: Record<string, any> }>) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    showToast: (state, action: PayloadAction<{ message: string; type: UIState['toast']['type'] }>) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;