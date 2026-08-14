import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"

import { Controller, useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type DataRefund = {
        nome: string,
        categoria: string,
        valor: number,
        file?: File | undefined
}

const schema = yup.object({
    nome: yup.string().required("Nome é obrigatório"),
    categoria: yup.string().required("Selecione uma categoria"),
    valor: yup.number().positive("Valor deve ser maior que zero").required("Valor é obrigatório"),
    file: yup.mixed(),   
})

export function Refund(){

    const { control, handleSubmit, formState: {errors} } = useForm<DataRefund>({
        defaultValues: {
            nome: "",
            categoria: "",
            valor: 0,
            file: undefined
        },
        resolver: yupResolver(schema)
    })

    function onSubmit(data: DataRefund){
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Solicitação de reembolso</h1>
                <h3>Dados da despesa para solicitar reembolso</h3>
            </div>

            <div>
                <Controller 
                    control={control}
                    name="nome"
                    render={(({field}) => <Input legenda="Nome da solicitação" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.nome?.message}</p>


                <span>
                    <Controller 
                        control={control}
                        name="categoria"
                        render={(({field}) => 
                            <select {...field}>
                                <option value="" disabled>Selecione</option>
                                
                                <option value="alimentacao">Alimentação</option>
                                <option value="hospedagem">Hospedagem</option>
                                <option value="transporte">transporte</option>
                                <option value="servicos">Serviços</option>
                                <option value="outros">Outros</option>
                            </select>
                        )}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.categoria?.message}</p>
                    
                    <Controller 
                        control={control}
                        name="valor"
                        render={(({field}) => <Input type="number" legenda="Valor" {...field}/>)}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.valor?.message}</p>
                    
                    <Controller 
                        control={control}
                        name="file"
                        render={({ field: { onChange, onBlur, name, ref } }) => (
                            <Input 
                                type="file" 
                                legenda="Comprovante"
                                name={name}
                                ref={ref}
                                onBlur={onBlur}
                                onChange={(e) => onChange(e.target.files?.[0])}
                            />
                        )}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.file?.message}</p>
                </span>

                <Button type="submit">Enviar</Button>

            </div>

        </form>
    )
}