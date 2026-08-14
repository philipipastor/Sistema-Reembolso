import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"

import { useForm, Controller} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

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

    function onSubmit(data: Login){
        console.log(data)
    }

    return(
        <div>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                control={control}
                name="email"
                render={(({field}) => <Input type="email" legenda="E-mail" placeholder="Informe o seu e-mail" {...field}/>)}
                />
                <p>{errors.email?.message}</p>

                <Controller 
                control={control}
                name="password"
                render={(({field}) => <Input type="password" legenda="Senha" placeholder="Informe a sua senha" {...field}/>)}
                />
                <p>{errors.password?.message}</p>
                
                <Button legenda={"Entrar"}/>
            </form>
            
        </div>
    )
}