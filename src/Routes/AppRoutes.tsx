import { Routes, Route } from "react-router"

import { Login } from "../pages/Login/Login"

export function AppRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}