import { create } from 'zustand';

interface User {
  id: number | undefined;
  setId: (id: number | undefined) => void;
}

export const useUser = create<User>((set) => ({
  id: undefined,
  setId: (id) => set({id}),
}));


interface Category{
  categoryId: number | undefined;
  setCategoryId: (id: number | undefined) => void;
}

export const useCategory = create<Category>((set) => ({
  categoryId: undefined,
  setCategoryId: (categoryId) => set({categoryId}),
}));