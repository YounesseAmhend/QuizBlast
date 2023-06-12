
interface Props{
    text:string | undefined
}

export default function Quote(props: Props){
    return (
        <div>
            {props.text}
        </div>
    )
}