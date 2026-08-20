import { useContext } from "react";

import { authContext } from "../context/AuthContext";

export function useAuth(){
    const contextValue = useContext(authContext)

    return contextValue
}

