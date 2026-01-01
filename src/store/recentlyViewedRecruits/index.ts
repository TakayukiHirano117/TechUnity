import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentlyViewedState {
  recentlyViewedIds: string[];
  addRecruitId: (id: string) => void;
  clearAll: () => void;
}

const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      recentlyViewedIds: [],
      addRecruitId: (id: string) =>
        set((state) => {
          // 既に存在する場合は先頭に移動、なければ追加
          const filtered = state.recentlyViewedIds.filter(
            (existingId) => existingId !== id,
          );
          const newIds = [id, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
          return { recentlyViewedIds: newIds };
        }),
      clearAll: () => set({ recentlyViewedIds: [] }),
    }),
    {
      name: "recently-viewed-recruits",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
