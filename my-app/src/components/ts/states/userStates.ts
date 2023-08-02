import { create } from 'zustand';

interface User {
  id: number | undefined;
  setId: (id: number | undefined) => void;
}

export const useUser = create<User>((set) => ({
  id: undefined,
  setId: (id) => set({id}),
}));



//const [userId, setUserId] = useState<number | undefined>(undefined)