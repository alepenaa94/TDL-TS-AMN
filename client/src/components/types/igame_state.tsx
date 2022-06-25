
//type IGame_state<T> = T extends object ? { -readonly [K in keyof T]: IGame_state<T[K]> } : T

type IGame_state <T extends {}> = { 
    end_game: boolean,
    win_game:boolean,
    login: boolean,
    data?:T
}


export default IGame_state;