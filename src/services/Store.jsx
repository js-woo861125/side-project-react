import { create } from "zustand";

export const useGlobal = create((set) => ({
    userid : '',
    username: '', // Add username state
    serverpath: '',
    setUserid : (x) => set({userid:x}),
    setUsername: (x) => set({username:x}), // Add setUsername action
    setServerpath: (x) => set({useserverpath:x})

}))