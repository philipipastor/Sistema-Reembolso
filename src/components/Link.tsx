type Props = React.ComponentProps<"a">
    
export function Link({children, ...rest}: Props){
    return(
        <a {...rest}>{children}</a>
    )
}