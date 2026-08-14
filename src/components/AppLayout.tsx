import logo from "../assets/logo.svg"

import { Outlet } from "react-router"

type Props = {
    nome?: string
}

export function AppLayout({nome}: Props){
    return(
        <div>
            <main>
                <img src={logo} alt="logo"/>
                <p>Olá, {nome}</p>

                <Outlet />
            </main>
        </div>
    )
}