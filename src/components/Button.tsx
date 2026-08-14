type Props = React.ComponentProps<"button"> & {
    legenda: string
}

export function Button({legenda ,...rest}: Props){
    return(
        <button className= "w-sm h-12 bg-green-100 text-amber-50 rounded-lg" {...rest}>{legenda}</button>
    )
}