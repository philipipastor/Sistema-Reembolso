import { useState, createContext, type ReactNode, useEffect } from "react";
import { type UserApiResponse } from "../dtos/user.ts"
import { api } from "../services/api.ts";

type AuthContext = {
    session: null | UserApiResponse,
    save: (data: UserApiResponse) => void,
    isLoading: boolean,
    logout: () => void
}

const LocalStorageKey = "@refund"

export const authContext = createContext({} as AuthContext)

export function ContextProvider({children}: {children: ReactNode}){

    const [session, setSession] = useState<null | UserApiResponse>(null)
    const [isLoading, setIsLoading] = useState(true)

    function save(data: UserApiResponse) {
        localStorage.setItem(`${LocalStorageKey}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LocalStorageKey}:token`, data.token)

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

        setSession(data)
    }

    function logout(){
        setSession(null)

        localStorage.removeItem(`${LocalStorageKey}:user`)
        localStorage.removeItem(`${LocalStorageKey}:token`)

        window.location.assign("/")
    }

    function loadUser() {
        const user = localStorage.getItem(`${LocalStorageKey}:user`)
        const token = localStorage.getItem(`${LocalStorageKey}:token`)

        if(token && user){

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return(
        <authContext.Provider value={{session, save, isLoading, logout}}>
            {children}
        </authContext.Provider>
    )
}