interface Option{
    id: string;
    text: string;
    correct: boolean;
}
interface Props{
    remove(id: string):void,
    corrected(id: string):void
    Options: Option[]
}
export default function Options(props: Props){
    return(
        <div className="ml-1 mr-1">
            {props.Options.map(function(option:Option){
                    return (
                        <div className={option.correct ? "list space-between listCorrect" : "list space-between"} key={option.id} >
                            <div className="option-text" onClick={()=>props.corrected(option.id)}>
                                {option.text}
                            </div>
                            <i onClick={()=>props.remove(option.id)} className="trash-icon fa-solid fa-trash-can"></i>
                        </div>
                    )
            })}
        </div>
    )
}
