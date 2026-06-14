import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CustomersState {
  selectedCustomerId: number | null;
  scrollPosition: number;

  setSelectedCustomerId: (id: number | null) => void;
  setScrollPosition: (position: number) => void;
}

export const useCustomersStore = create<CustomersState>()(
  immer((set) => ({
    selectedCustomerId: null,
    scrollPosition: 0,

    setSelectedCustomerId: (id) =>
      set((state) => {
        state.selectedCustomerId = id;
      }),

    setScrollPosition: (position) =>
      set((state) => {
        state.scrollPosition = position;
      }),
  }))
);