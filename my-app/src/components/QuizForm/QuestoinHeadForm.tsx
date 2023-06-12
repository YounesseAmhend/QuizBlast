interface Props{
    add():void,
}
export default function QuestionHead(props: Props){
    return(
            <div className='options'>
                <h3 className='text-3xl font-medium h3'>Options</h3>
                <div onClick={props.add}>
                    <i className="fa-solid fa-square-plus" id="add-option-btn"></i>
                </div>
            </div>
    )
}