import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Link } from "../components/Link.tsx"

import { api } from "../services/api.ts"

import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"

type Cadastro = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
}

const schema = yup.object({
    name: yup.string().trim().required("Informe o seu nome"),
    email: yup.string().email("Digite um e-mail válido").required("Informe seu e-mail"), 
    password: yup.string().min(6, "Senha deve ter pelo menos 6 dígitos").required("Informe sua senha"),
    passwordConfirm: yup.string().min(6, "Senha deve ter pelo menos 6 dígitos").required("Confirme sua senha").oneOf([yup.ref("password")], "As senhas não coincidem")
})

export function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [textError, setTextError] = useState("")

    const {control, handleSubmit, formState: {errors}} = useForm<Cadastro>({
        defaultValues:{
            name: "",
            email: "",
            password: "",
            passwordConfirm:""
        },
        resolver: yupResolver(schema)
        })

    async function onSubmit(data: Cadastro){

        try {
            setIsLoading(true)

            await api.post("/users", data)

            if(confirm("Cadastro concluido, deseja seguir para a página de login ?")){
                navigate("/")
            }
            
        } catch (error) {

            console.log(error)

            if(error instanceof AxiosError){
                return setTextError(error.response?.data.message)
            }

            setTextError("Não foi possível cadastrar!")
        }

        finally {
            setIsLoading(false)
        }
    }

    return(
        <div>
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                control={control}
                name="name"
                render={(({field}) => <Input legenda="Nome" placeholder="Informe seu nome" variant="inputC" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.name?.message}</p>

                <Controller 
                control={control}
                name="email"
                render={(({field}) => <Input legenda="e-mail" placeholder="Informe seu e-mail" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.email?.message}</p>
                
                <Controller 
                control={control}
                name="password"
                render={(({field}) => <Input legenda="senha" type="password" placeholder="Informe sua senha" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.password?.message}</p>

                <Controller
                control={control}
                name="passwordConfirm"
                render={(({field}) => <Input legenda="confirme a senha" type="password" placeholder="Confirme sua senha" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.passwordConfirm?.message}</p>

                <p className="text-red-600 ml-2 text-sm flex justify-center items-center mt-5">{textError}</p>

                <Button type="submit" isLoading={isLoading}>Cadastrar</Button>

                <Link href="/">Já tenho uma conta</Link>
            </form>

        </div>

    )
}