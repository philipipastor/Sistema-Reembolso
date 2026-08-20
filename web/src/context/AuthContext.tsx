import { useState, createContext, type ReactNode } from "react";
import { type UserApiResponse } from "../dtos/user.ts"

type AuthContext = {
    session: null | UserApiResponse,
    save: (data: UserApiResponse) => void
}

export const authContext = createContext({} as AuthContext)

export function ContextProvider({children}: {children: ReactNode}){

    const [session, setSession] = useState<null | UserApiResponse>(null)

    function save(data: UserApiResponse){
        setSession(data)
    }

    return(
        <authContext.Provider value={{session, save}}>
            {children}
        </authContext.Provider>
    )
}