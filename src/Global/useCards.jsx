import { create } from 'zustand'

export const useCardsStore = create((set) => ({
       
        cardCount: 0,
        increaseCardCount: () => set((state) => ({ cardCount: state.cardCount + 1 })),
      
}))

export default useCardsStore;