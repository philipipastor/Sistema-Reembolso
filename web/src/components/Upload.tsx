import { forwardRef } from "react"
import upload from "../assets/upload.svg"

type Props = React.ComponentProps<"input"> & {
    file?: string | undefined
}

export const Upload = forwardRef<HTMLInputElement, Props>(
    ({file = null, ...rest}, ref) => {
        return(
            <div>
                <legend className="uppercase text-xxs text-gray-200 mb-2">
                    Comprovante
                </legend>

                <div className="w-full h-12 flex items-center rounded-lg border border-gray-300 text-sm text-gray-100 bg-transparent outline-none">
                    <input ref={ref} type="file" id="upload" className="hidden" {...rest}/>
                
                    <span className="text-xs text-gray-100 flex-1 pl-4">
                        {file ?? "Selecione o arquivo"}
                    </span>

                    <label className="flex h-12 px-4 items-center bg-green-100 rounded-lg cursor-pointer disabled:opacity-50 hover:bg-gray-200 transition ease-linear" htmlFor="upload">
                        <img src={upload} alt="ícone de upload" className="w-6 h-6"/>
                    </label>
                </div>
            </div>
        )
    }
)