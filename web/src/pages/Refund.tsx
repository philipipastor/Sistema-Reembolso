import { categories, categories_keys } from "../utils/categoria.ts"

import file from "../assets/file.svg"

import { api } from "../services/api.ts"
import { AxiosError } from "axios"

import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { Select } from "../components/Select.tsx"
import { Upload } from "../components/Upload.tsx"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { Controller, useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import type { RefundApiResponse } from "../dtos/refunds.ts"

type DataRefund = {
        name: string,
        category: string,
        amount: number,
        filename: File
}

const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    category: yup.string().required("Selecione uma categoria"),
    amount: yup.number().
        transform((value,originalValue) => originalValue === "" || Number.isNaN(value) ? undefined : value).
        typeError("Valor deve ser um número válido").
        positive("Valor deve ser maior que zero").
        required("Valor é obrigatório"),
    filename: yup.mixed<File>().required("Comprovante é obrigatório"),   
})

export function Refund(){

    const navigate = useNavigate()

    const params = useParams<{id: string}>()

    const [isLoading, setIsLoading] = useState(false)
    const [textError, setTextError] = useState("")
    const [fileURL, setFileURL] = useState<string | null>(null)

    const { control, handleSubmit, reset, formState: {errors} } = useForm<DataRefund>({
        defaultValues: {
            name: "",
            category: "",
            amount: 0,
            filename: undefined
        },
        resolver: yupResolver(schema)
    })

    async function onSubmit(data: DataRefund){

        if(params.id){
            return navigate(-1)
        }

        try {
            setIsLoading(true)

            const fileUploadForm = new FormData()
             if (!data.filename) {
                return setTextError("Comprovante é obrigatório")
            }
            fileUploadForm.append("file", data.filename)
            const response = await api.post("/uploads", fileUploadForm)

            await api.post("/refunds", {...data, filename: response.data.filename})

            navigate("/confirm", { state: {fromSubmit: true}})

        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                return setTextError(error.response?.data.message)
            }

            setTextError("Não foi possível realizar a solicitação")
        }

        finally{
            setIsLoading(false)
        }

    }

    async function fetchRefund(id: string) {
        try {
            const response = await api.get<RefundApiResponse>(`/refunds/${id}`)

            reset({
                name: response.data.name,
                category: response.data.category,
                amount: response.data.amount,
            })

            setFileURL(response.data.filename)

        } catch (error){
            console.log(error)

            if(error instanceof AxiosError){
                return setTextError(error.response?.data.message)
            }

            setTextError("Não foi possível carregar")
        }
    }

    useEffect(() => {
        if(params.id){
            fetchRefund(params.id)
        }
    },[params.id])

    return(
        <form className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"onSubmit={handleSubmit(onSubmit)}>
            <header>
                <h1 className="font-bold">Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso</p>
            </header>

            <div>
                <Controller 
                    control={control}
                    name="name"
                    render={(({field}) => 
                    <Input 
                    legenda="Nome da solicitação" 
                    {...field} 
                    disabled={!!params.id}
                    />)}
                />
                <p className="text-red-600 ml-2 text-sm">{errors.name?.message}</p>


                <div className="flex gap-4">

                    <div>
                    <Controller 
                        control={control}
                        name="category"
                        render={(({field}) => 
                            <Select {...field} legenda="Categoria" disabled={!!params.id}>
                                {categories_keys.map((categoria) => 
                                    <option key={categoria} value={categoria}>
                                        {categories[categoria].name}
                                    </option>
                                )}
                            </Select>
                        )}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.category?.message}</p>
                    </div>
                    
                    <div>
                    <Controller
                        control={control}
                        name="amount"
                        render={(({field}) => <Input type="number" legenda="Valor" {...field} disabled={!!params.id}/>)}
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.amount?.message}</p>
                    </div>
                    
                </div>
                    
                    <Controller 
                        control={control}
                        name="filename"
                        render={({ field: { onChange, onBlur, name, ref, value } }) => 
                            {
                                return (params.id && fileURL) ? 
                                (<a href={`http://localhost:3333/uploads/${fileURL}`} target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover: opacity-70 transition ease-linear"> <img src={file} alt="ícone de arquivo"/> Abrir comprovante </a>) 
                                : 
                                (<Upload
                                    type="file"
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={(e) => onChange(e.target.files?.[0])}
                                    file={value?.name} />)
                            }
                        }
                    />
                    <p className="text-red-600 ml-2 text-sm">{errors.filename?.message}</p>

                <p className="text-red-600 ml-2 text-sm flex justify-center items-center mt-5">{textError}</p>
                
                <div className="mt-4">
                    <Button type="submit" isLoading={isLoading}>
                        {params.id ? "Voltar" : "Enviar"}
                    </Button>
                </div>
                
            </div>

        </form>
    )
}