import { useState } from "react"

import { Input } from "../components/input.tsx"
import { Button } from "../components/Button.tsx"
import { RefundItems, type PropsRefundItems } from "../components/RefundItems.tsx"
import { Pagination } from "../components/Pagination.tsx"

import search from "../assets/search.svg"

import { categories } from "../utils/categoria.ts"
import { formatCurrency } from "../utils/formatCurrency.ts"

const exemplo = {
    id: "123", 
    nome: "ph",
    category: "transporte",
    amount: formatCurrency(34.50),
    categoryIcon: categories["transport"].icon
}

export function Dashboard(){

    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(10)
    const [refunds, setRefunds] = useState<PropsRefundItems[]>([exemplo])

    function fetchRefunds(e: React.FormEvent){
        e.preventDefault()
    }

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

            <form className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 mmd:flex-row gap-2 mt-6" onSubmit={fetchRefunds}>
                <Input placeholder="Pesquisar pelo nome" variant="manager" onChange={(e) => setName(e.target.value)}/>
                <Button type="submit" variant="icon">
                    <img src={search} alt="ícone de pesquisa" className="w-5"/>
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
                {refunds.map((item) => 
                <RefundItems key={item.id} data={exemplo} href={`/refund/${item.id}`}/>
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