
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
            <div className="flex justify-between header-question">
                <div className="self-center pl-3 font-semibold">{props.quizname}</div>
                <div className="flex gap-5 items-center">
                    <div>{props.timer}s</div>
                    <div className="tracking-wide"><span>{props.pageCount}</span> of <span>{props.questionLength}</span></div>
                    <div className="score">Score : <span className="font-medium">{props.score}</span></div>
                </div>
            </div>
        </>
    )
}