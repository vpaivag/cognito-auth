import { atom } from 'jotai';

export const isAuthenticatedAtom = atom<boolean>(false);
export const userAtom = atom<{
  username: string;
  userId: string;
  name?: string;
} | null>(null);
