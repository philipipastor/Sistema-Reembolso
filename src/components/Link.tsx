type Props = React.ComponentProps<"a">
    
export function Link({children, ...rest}: Props){
    return(
        <a className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"{...rest}>{children}</a>
    )
}