
//type IGame_state<T> = T extends object ? { -readonly [K in keyof T]: IGame_state<T[K]> } : T

type gen_state<T extends {}> = T

export default gen_state;