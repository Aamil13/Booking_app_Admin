import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface userState {
  userName: string;
  setUserName: (by: string) => void;
  resetUserName: () => void;
}

// export const useMainStore = create<userState>()((set) => ({
//   userName: '',
//   setUserName: (name) => set(() => ({ userName: name })),
// }));

export const useMainStore = create<userState>()(
  persist(
    (set) => ({
      userName: '',
      setUserName: (name) => set(() => ({ userName: name })),
      resetUserName: () => set(() => ({ userName: '' })),
    }),
    {
      name: 'next-admin', // The name of the storage key
    }
  )
);
