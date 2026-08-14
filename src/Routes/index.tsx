import { BrowserRouter } from "react-router"
import { AuthRoutes } from "./Auth-Routes"

export function Routes(){
    return (
        <BrowserRouter>
            <AuthRoutes/>
        </BrowserRouter>
    )
}