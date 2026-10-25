'use client';
import { createContext, useContext } from 'react';

export type MatrixState = {
  matrixMode: boolean;
  isMuted: boolean;
  toggleMatrix: () => void;
  toggleMute: () => void;
};

export const MatrixContext = createContext<MatrixState | null>(null);

export function useMatrix() {
  const ctx = useContext(MatrixContext);
  if (!ctx) throw new Error('useMatrix must be used inside ClientLayoutWrapper');
  return ctx;
}
