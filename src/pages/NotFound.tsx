import { Link } from "../components/Link"

export function NotFound(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h1 className="text-gray-100 font-semibold text-2xl mb-10">Página não encontrada</h1>
                <Link href="/">Voltar para o ínicio</Link>
            </div>
        </div>
    )
}