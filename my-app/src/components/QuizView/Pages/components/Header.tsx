import Timer from "./Timer"

interface Props{
    setChosed: (React.Dispatch<React.SetStateAction<boolean>>),
    setTimeIsOut: (React.Dispatch<React.SetStateAction<boolean>>),
    TimeIsOut: boolean,
    quizname: string | undefined,
    questionLength: number | undefined,
    pageCount: number,
    score: number,
    timer: number,
    paused: boolean,
}

export default function Header(props: Props){
    console.log("timer :",props.timer)
    return(
        <>
            <div className="self-center flex  justify-center ">
                {props.timer === 0 && <div className="font-semibold text-xl rounded-b-md max-[600px]:p-2 max-[600px]:text-sm p-3 border-x border-b border-blue-100">{props.quizname}</div>}
            </div>
            <div className="flex justify-center header-question">
                <div className="flex justify-between  items-center w95">
                        <div className="tracking-wide text-center w-20 "><span className="font-semibold">{props.pageCount}</span> of <span className="font-bold">{props.questionLength}</span></div>
                            {props.timer !== 0 && <div className="w-20 flex justify-center"><Timer timeIsUp={props.TimeIsOut} setTimeIsOut={props.setTimeIsOut} setChosed={props.setChosed} paused={props.paused}  time={props.timer}/></div>}
                        <div className="score text-center w-20">Score <span className="font-medium">{props.score}</span></div>
                </div>
            </div>
        </>
    )
}