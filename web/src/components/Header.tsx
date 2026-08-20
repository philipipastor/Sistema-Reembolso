import logo from "../assets/logo.svg"
import logout from "../assets/logout.svg"

import { useAuth } from "../hooks/useContext"

export function Header(){

    const auth = useAuth()

    return(
        <header className="w-full flex justify-between px-12">
            <img className="my-8"src={logo} alt="logo" />

            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-200">Olá, {auth.session?.user.name}</span>

                <img className="my-8 cursor-pointer hover:opacity-75 transition ease-linear" src={logout} alt="ícone de sair" onClick={() => auth.logout()}/>
            </div>
        </header>
    )
}