import { useEffect, useState } from "react"
import { AxiosError } from "axios"

import { api } from "../services/api.ts"
import { type RefundsPaginationApiResponse } from "../dtos/refunds.ts"

import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { RefundItems, type PropsRefundItems } from "../components/RefundItems.tsx"
import { Pagination } from "../components/Pagination.tsx"

import search from "../assets/search.svg"

import { categories } from "../utils/categoria.ts"
import { formatCurrency } from "../utils/formatCurrency.ts"

const perPage =  5

export function Dashboard(){

    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [refunds, setRefunds] = useState<PropsRefundItems[]>([])

    async function fetchRefunds(){

        try {
            const response = await api.get<RefundsPaginationApiResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${perPage}`)    
            console.log(response.data)
            
        setRefunds(
            response.data.refunds.map((refund) => ({
                id: refund.id,
                name: refund.user.name,
                description: refund.name,
                amount: formatCurrency(refund.amount),
                categoryIcon: categories[refund.category].icon,
            }))
            )

        setTotalPage(response.data.pagination.totalPages)
                
            
        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                alert(error.response?.data.message)
            }

            alert("Não foi possível carregar")
        }
    }

    function onSubmit(e:React.FormEvent) {
        e.preventDefault()
        fetchRefunds()
    }

    useEffect(() => {
        fetchRefunds()
    },[page])

    function handlePagination(action: "next" | "back") {
        setPage((prevPage) => {
            if(action === "next" && prevPage < totalPage) {
                return prevPage + 1
            }

            if(action === "back" && prevPage > 1) {
                return prevPage - 1
            }

            return prevPage
        })
    }

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-win-[768px]">
            <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

            <form className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 mmd:flex-row gap-2 mt-6" onSubmit={onSubmit}>
                <Input placeholder="Pesquisar pelo nome" variant="manager" onChange={(e) => setName(e.target.value)}/>
                <Button type="submit" variant="icon">
                    <img src={search} alt="ícone de pesquisa" className="w-5"/>
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
                {refunds.map((item) => 
                <RefundItems key={item.id} data={item} href={`/refund/${item.id}`}/>
                )}
            </div>
            
            <div>
                <Pagination 
                current={page} 
                total={totalPage} 
                onNext={() => handlePagination("next")} 
                onBack={() => handlePagination("back")}/>
            </div>
        </div>
    )
}