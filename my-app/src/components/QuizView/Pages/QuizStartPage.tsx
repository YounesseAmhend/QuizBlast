
interface Props {
 madeBy: string,
 quizname: string | undefined,
 visible : boolean,
 loaded : boolean,
 startQuiz():void,
 questionLength : number | undefined,
}
export default function QuizStart(props: Props) {
    const {quizname, visible, loaded, startQuiz, madeBy, questionLength} = props
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
                    <div className="flex justify-center"><div className="pb-2 pt-1 text-sm rounded-t-md px-1 border-x border-t border-gray-300 font-medium text-gray-400">Made by <span className="italic font-semibold text-gray-500 cursor-pointer">{madeBy}</span></div></div>
                </div>
            </div>}
        </>
    )
}