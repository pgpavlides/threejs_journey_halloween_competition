import {create} from 'zustand'



export const useStore = create((set) => ({
    globalNumber: 20,
    gameStage: 'stage0',
    setGameStage1: () => set(state => ({ gameStage : 'stage1' })),
    setGameStage2: () => set(state => ({ gameStage : 'stage2' })),
    setGameStage3: () => set(state => ({ gameStage : 'stage3' })),
    setGameStage4: () => set(state => ({ gameStage : 'stage4' })),
    setGameStage5: () => set(state => ({ gameStage : 'stage5' })),
    setGameStage6: () => set(state => ({ gameStage : 'stage6' })),
    setGameStage7: () => set(state => ({ gameStage : 'stage7' })),
    setGameStage8: () => set(state => ({ gameStage : 'stage8' })),
}))

// const numberOfPlanes = useStore((state) => state.numberOfPlanes);

