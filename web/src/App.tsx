import { Routes } from "./Routes"

import { ContextProvider } from "./context/AuthContext.tsx"

export default function App() {

  return (
    <ContextProvider>
      <Routes/>
    </ContextProvider>
  )
}


