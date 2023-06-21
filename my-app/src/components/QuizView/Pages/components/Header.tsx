
interface Props{
    quizname: string | undefined,
    questionLength: number | undefined,
    pageCount: number,
    score: number,
    timer: number,
}

export default function Header(props: Props){
    return(
        <>
            <div className="self-center flex  justify-center ">
                <div className="font-semibold text-xl rounded-b-md max-[600px]:p-2 max-[600px]:text-sm p-3 border-x border-b border-blue-100">{props.quizname}</div>
            </div>
            <div className="flex justify-between header-question items-center">
                    <div className="tracking-wide text-center max-[600px]:ml-2 ml-3"><span className="font-semibold">{props.pageCount}</span> of <span  className="font-bold">{props.questionLength}</span></div>
                    { props.timer !== 0 && <div className="pl-5 text-center">{props.timer}s</div>}
                    <div className="score text-center max-[600px]:mr-2 mr-3">Score <span className="font-medium">{props.score}</span></div>
            </div>
        </>
    )
}