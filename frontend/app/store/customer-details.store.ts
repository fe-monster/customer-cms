import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CustomField } from "../types/customer";

interface CustomerDetailsState {
  isEditing: boolean;
  editingFieldIndex: number | null;
  customFields: CustomField[];

  setIsEditing: (value: boolean) => void;
  toggleEditing: () => void;
  setEditingFieldIndex: (index: number | null) => void;
  setCustomFields: (fields: CustomField[]) => void;
  addCustomField: () => void;
  updateCustomField: (index: number, key: string, value: string) => void;
  removeCustomField: (index: number) => void;
  reset: () => void;
}

const initialState = {
  isEditing: false,
  editingFieldIndex: null,
  customFields: [],
};

export const useCustomerDetailsStore = create<CustomerDetailsState>()(
  immer((set) => ({
    ...initialState,

    setIsEditing: (value) =>
      set((state) => {
        state.isEditing = value;
        if (!value) {
          state.editingFieldIndex = null;
        }
      }),

    toggleEditing: () =>
      set((state) => {
        state.isEditing = !state.isEditing;
        if (!state.isEditing) {
          state.editingFieldIndex = null;
        }
      }),

    setEditingFieldIndex: (index) =>
      set((state) => {
        state.editingFieldIndex = index;
      }),

    setCustomFields: (fields) =>
      set((state) => {
        state.customFields = fields;
      }),

    addCustomField: () =>
      set((state) => {
        state.customFields.push({ key: "", value: "" });
        state.editingFieldIndex = state.customFields.length - 1;
      }),

    updateCustomField: (index, key, value) =>
      set((state) => {
        state.customFields[index] = { key, value };
      }),

    removeCustomField: (index) =>
      set((state) => {
        state.customFields.splice(index, 1);
        if (state.editingFieldIndex === index) {
          state.editingFieldIndex = null;
        }
      }),

    reset: () => set(() => initialState),
  }))
);