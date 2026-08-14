import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Link } from "../components/Link.tsx"

export function Cadastro() {
    return(
        <div>
            <form className="w-full flex flex-col gap-4">
                <Input legenda="Nome" placeholder="Informe seu nome"/>
                <Input legenda="e-mail" placeholder="Informe seu e-mail"/>
                <Input legenda="senha" type="passsword" placeholder="Informe sua senha"/>
                <Input legenda="confirme a senha" type="passsword" placeholder="Confirme sua senha"/>

                <Button>Cadastrar</Button>

                <Link href="/">Já tenho uma conta</Link>
            </form>

        </div>


    )
}