import { create } from "zustand";

interface globalStateStore {
  focus: boolean;
  onFocus: () => void;
  offFocus: () => void;
}

const useGlobalState = create<globalStateStore>((set) => ({
  focus: false,
  onFocus: () => set({ focus: true }),
  offFocus: () => set({ focus: false }),
}));

export default useGlobalState;
