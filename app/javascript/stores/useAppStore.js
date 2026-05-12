import { create } from "zustand"

const useAppStore = create((set) => ({
  showSpots: false,
  setShowSpots: (showSpots) => set({ showSpots: showSpots }),
}))

export default useAppStore
