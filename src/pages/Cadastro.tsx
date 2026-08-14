import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Link } from "../components/Link.tsx"

import { Controller, useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type Cadastro = {
    nome: string,
    email: string,
    password: string,
    passwordConfirm: string
}

const schema = yup.object({
    nome: yup.string().required("Informe o seu nome"),
    email: yup.string().email("Digite um e-mail válido").required("Informe seu e-mail"), 
    password: yup.string().required("Informe sua senha"),
    passwordConfirm: yup.string().required("Confirme sua senha").oneOf([yup.ref("password")], "As senhas não coincidem")
})

export function Cadastro() {

    const {control, handleSubmit, formState: {errors}} = useForm<Cadastro>({
        defaultValues:{
            nome: "",
            email: "",
            password: "",
            passwordConfirm:""
        },
        resolver: yupResolver(schema)
        })

    function onSubmit(data: Cadastro){
        console.log(data)
    }

    return(
        <div>
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                control={control}
                name="nome"
                render={(({field}) => <Input legenda="Nome" placeholder="Informe seu nome" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.nome?.message}</p>

                <Controller 
                control={control}
                name="email"
                render={(({field}) => <Input legenda="e-mail" placeholder="Informe seu e-mail" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.email?.message}</p>
                
                <Controller 
                control={control}
                name="password"
                render={(({field}) => <Input legenda="senha" type="passsword" placeholder="Informe sua senha" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.password?.message}</p>

                <Controller
                control={control}
                name="passwordConfirm"
                render={(({field}) => <Input legenda="confirme a senha" type="passsword" placeholder="Confirme sua senha" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.passwordConfirm?.message}</p>

                <Button type="submit">Cadastrar</Button>

                <Link href="/">Já tenho uma conta</Link>
            </form>

        </div>

    )
}