import { create } from "zustand";

type ViewModeStore = {
  isCreative: boolean;
  isLoading: boolean;
  toggleMode: () => void;
  setCreative: (value: boolean) => void; // Safer than toggle for initialization
  setLoaded: () => void;
};

export const useViewMode = create<ViewModeStore>((set) => ({
  isCreative: false, // Default to Architect (clean)
  isLoading: true, // Default to Loading
  toggleMode: () => set((state) => ({ isCreative: !state.isCreative })),
  setCreative: (value) => set({ isCreative: value }),
  setLoaded: () => set({ isLoading: false }),
}));
