import { create } from "zustand";
import Cookies from "js-cookie";
import { TCommunity} from "@/types/community";
interface Props {
  community: TCommunity;
  setCommunity: (community: TCommunity) => void;
}

const defaultCommunity = JSON.parse(
  Cookies.get("community") || "{}"
) as TCommunity;

export const useCommunity = create<Props>((set) => ({
  community: defaultCommunity,
  setCommunity: (community: TCommunity) => set({ community }),
}));
