import { categories, categories_keys } from "../utils/categoria.ts"

import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Select } from "../components/Select.tsx"
import { Upload } from "../components/Upload.tsx"

import { useState } from "react"

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
    valor: yup.number().
        transform((value,originalValue) => originalValue === "" || Number.isNaN(value) ? undefined : value).
        typeError("Valor deve ser um número válido").
        positive("Valor deve ser maior que zero").
        required("Valor é obrigatório"),
    file: yup.mixed(),   
})

export function Refund(){

    const [isLoading, setIsLoading] = useState(false)

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
        <form className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"onSubmit={handleSubmit(onSubmit)}>
            <header>
                <h1>Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso</p>
            </header>

            <div>
                <Controller 
                    control={control}
                    name="nome"
                    render={(({field}) => <Input legenda="Nome da solicitação" {...field}/>)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.nome?.message}</p>


                <div className="flex gap-4">

                    <div>
                    <Controller 
                        control={control}
                        name="categoria"
                        render={(({field}) => 
                            <Select {...field} legenda="Categoria">
                                {categories_keys.map((categoria) => 
                                    <option key={categoria} value={categoria}>
                                        {categories[categoria].name}
                                    </option>
                                )}
                            </Select>
                        )}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.categoria?.message}</p>
                    </div>
                    
                    <div>
                    <Controller 
                        control={control}
                        name="valor"
                        render={(({field}) => <Input type="number" legenda="Valor" {...field}/>)}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.valor?.message}</p>
                    </div>
                    
                </div>

                    <Controller 
                        control={control}
                        name="file"
                        render={({ field: { onChange, onBlur, name, ref, value } }) => (
                            <Upload 
                                type="file" 
                                name={name}
                                ref={ref}
                                onBlur={onBlur}
                                onChange={(e) => onChange(e.target.files?.[0])}
                                file={value?.name}
                            />
                        )}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.file?.message}</p>
                
                <div className="mt-6">
                    <Button type="submit" isLoading>Enviar</Button>
                </div>
                

            </div>

        </form>
    )
}