import { classMerge } from "../utils/ClassMerge"

type Props = React.ComponentProps<"input"> & {
    legenda?: string,
    variant?: "default" | "manager"
}

const variants = {
    input: {
        default: "w-full",
        manager: "w-232.5"
    }
}

export function Input({legenda, type="text", variant="default", ...rest}: Props){
    return(
        <fieldset className="flex flex-1 max-h-20 border-gray-200 focus-within:text-green-100">
            {legenda  &&
                <legend className="uppercase text-xxs text-inherit mb-2">{legenda}</legend>
            }

            <input className= {classMerge(["border-gray-300 mb-2 rounded-lg border w-full h-12 px-4 text-sm text-gray-100 bg-transparent outline-none focus:border-2 focus:border-green-100 placeholder-gray-300", variants.input[variant]])} type={type} {...rest} />
        </fieldset>
    )
}