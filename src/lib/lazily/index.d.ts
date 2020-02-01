type LazilyHandler = number;

export function lazily(callback: () => void): LazilyHandler;
export function cancelLazily(id: LazilyHandler): void;
