import { Routes, Route } from "react-router"

import { Login } from "../pages/Login"
import { AuthLayout } from "../components/AuthLayout"

export function AuthRoutes(){
    return(
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    )
}