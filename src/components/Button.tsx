import { classMerge } from "../utils/ClassMerge"

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean,
    variant?: "default" | "icon" | "iconSmall",
}

const variants = {
    button: {
        default: "h-12",
        icon: "h-12 w-12",
        iconSmall: "h-8 w-8"
    }
}

export function Button({children, isLoading, type="button", variant="default" ,...rest}: Props){
    return(
        <button className= {classMerge(["flex items-center justify-center w-full h-12 bg-green-100 text-white rounded-lg cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed", variants.button[variant]])}
        type={type} 
        disabled={false}
        {...rest}
        >{children}</button>
    )
}