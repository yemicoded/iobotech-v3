import { create } from "zustand";
import { TGetPayout } from "@/types/payout";
interface Props {
  payout: TGetPayout;
  setPayout: (payout: TGetPayout) => void;
}

export const usePayout = create<Props>((set) => ({
  payout: {} as TGetPayout,
  setPayout: (payout: TGetPayout) => set({ payout }),
}));
