import { Routes, Route } from "react-router"

import { AuthLayout } from "../components/AuthLayout"
import { Login } from "../pages/Login"
import { Cadastro } from "../pages/Cadastro"

export function AuthRoutes(){
    return(
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
            </Route>
        </Routes>
    )
}