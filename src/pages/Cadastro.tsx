import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Link } from "../components/Link.tsx"

export function Cadastro() {
    return(
        <div>
            <form className="w-full flex flex-col gap-4">
                <Input legenda="Nome"/>
                <Input legenda="e-mail"/>
                <Input legenda="senha" type="passsword"/>
                <Input legenda="confirme a senha" type="passsword"/>
                <Button>Cadastrar</Button>
            </form>

            <Link href="/">Já tenho uma conta</Link>
        </div>


    )
}