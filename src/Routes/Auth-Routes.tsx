import { Routes, Route } from "react-router"

import { AuthLayout } from "../components/AuthLayout"
import { Login } from "../pages/Login"
import { Cadastro } from "../pages/Cadastro"
import { NotFound } from "../pages/NotFound"

import { AppLayout } from "../components/AppLayout"
import { Refund } from "../pages/Refund"

export function AuthRoutes(){
    return(
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
            </Route>

            <Route element={<AppLayout/>}>
                <Route path="/refund" element={<Refund/>}/>
            </Route>
            
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}