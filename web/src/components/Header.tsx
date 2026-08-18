import logo from "../assets/logo.svg"
import logout from "../assets/logout.svg"

export function Header(){
    return(
        <header className="w-full flex justify-between px-12">
            <img className="my-8"src={logo} alt="logo" />

            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-200">Olá, Rodrigo</span>

                <img className="my-8 cursor-pointer hover:opacity-75 transition ease-linear" src={logout} alt="ícone de sair"/>
            </div>
        </header>
    )
}