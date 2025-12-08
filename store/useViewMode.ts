import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ViewState {
  isCreative: boolean;
  isLoading: boolean;
  toggleMode: () => void;
  setLoaded: () => void;
}

export const useViewMode = create<ViewState>()(
  persist(
    (set) => ({
      isCreative: false, // Default state
      isLoading: true, // Default state (Preloader is active)

      toggleMode: () => set((state) => ({ isCreative: !state.isCreative })),
      setLoaded: () => set({ isLoading: false }),
    }),
    {
      name: "ajdin-sahinbegovic-resume-view-mode",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isCreative: state.isCreative }),
    }
  )
);
