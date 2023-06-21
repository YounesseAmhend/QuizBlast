
interface Props {
 quizname: string | undefined,
 visible : boolean,
 loaded : boolean,
 startQuiz():void,
 questionLength : number | undefined,
}
export default function QuizStart(props: Props) {
    const {quizname, visible, loaded, startQuiz, questionLength} = props
    return (
        <>
            {(visible && loaded) && <div className="flex justify-center">
                <div className="rounded-lg shadow-lg w-6/12 flex-column max-[650px]:w-11/12">
                    <div className="flex justify-center quizname-container">
                        <div className="text-2xl p-3 font-bold quizname">{quizname}</div>
                    </div>
                    <div className="flex justify-center">
                        <div onClick={startQuiz} className="bg-blue-500 text-white rounded-md start-btn font-semibold cursor-pointer">Start</div>
                    </div>
                    <div className="flex justify-center"><div className="m-3 font-medium">{questionLength} Questions</div></div>
                </div>
            </div>}
        </>
    )
}