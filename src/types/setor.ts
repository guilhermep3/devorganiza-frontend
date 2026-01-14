export const setorTypes = ["frontend", "backend", "outro"] as const;
export type SetorType = typeof setorTypes[number];