
interface Props{
    is_authenticated:boolean | undefined;
    newDisplay():void;
}
export default function Auth(props: Props){
    return(
        <>
            {props.is_authenticated && 
                <>
                    <div className="nav-link-custom cursor-pointer self-center" onClick={props.newDisplay} >New Quiz</div>
                </>
            }
        </>
    )
}