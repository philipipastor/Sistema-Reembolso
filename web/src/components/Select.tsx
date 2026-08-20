type Props = React.ComponentProps<"select"> & {
    legenda?: string
}

export function Select({legenda, children, ...rest}: Props){
    return(
        <fieldset className="flex flex-1 max-h-20 border-gray-200 focus-within:text-green-100">
            {legenda  &&
                <legend className="uppercase text-xxs text-inherit mb-2">{legenda}</legend>
            }

            <select className= "border-gray-200 rounded-lg border w-full h-12 px-4 text-sm text-gray-100 bg-transparent outline-none focus:border-2 focus:border-green-100 placeholder-gray-300" 
            {...rest}>
                <option value="" disabled>Selecione</option>
                {children}
            </select>
        </fieldset>
    )
}