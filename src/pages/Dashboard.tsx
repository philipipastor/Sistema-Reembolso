import { Input } from "../components/input"

export function Dashboard(){
    return (
        <div className="bg-gray-500">
            <h1>Solicitações</h1>
            <Input placeholder="Pesquisar pelo nome"/>
        </div>
    )
}