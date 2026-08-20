import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Link } from "../components/Link.tsx"

import { api } from "../services/api.ts"
import { useAuth } from "../hooks/useContext.tsx"

import { useState } from "react"
import { useForm, Controller} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AxiosError } from "axios"

type Login = {
    email: string,
    password: string
}

const schema = yup.object({
    email: yup.string().email("Digite um e-mail válido").required("Informe seu e-mail"), 
    password: yup.string().required("Informe sua senha")})

export function Login(){

    const {control, handleSubmit, formState: {errors}} = useForm<Login>({
        defaultValues:{
            email: "",
            password: ""
        },
        resolver:yupResolver(schema)
    })

    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState("")
    const auth = useAuth()

    async function onSubmit(data: Login){

        try {
            setIsLoading(true)
            setMessageError("")
            const response = await api.post("/sessions", data)
            auth.save(response.data)
            
        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return setMessageError(error.response?.data.message)
            }

            return setMessageError("Não foi possível entrar!")
        }
        
    }

    return(
        <div>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                control={control}
                name="email"
                render={(({field}) => <Input type="email" legenda="E-mail" placeholder="Informe o seu e-mail" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.email?.message}</p>

                <Controller 
                control={control}
                name="password"
                render={(({field}) => <Input type="password" legenda="Senha" placeholder="Informe a sua senha" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.password?.message}</p>

                <p className="text-sm text-red-600 text-center my-4 font-medium">{messageError}</p>

                <div className="w-sm">
                    <Button type="submit" isLoading={isLoading}>Entrar</Button>
                </div>
                

                <Link href="/cadastro">Criar conta</Link>

            </form>

        </div>
    )
}