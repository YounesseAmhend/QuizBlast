import { useFetch } from "../ts/hooks"
import { useState } from "react";
import Loading from "../ts/components/loading";
import QuizPage from "./Pages/QuizPage";
import QuizStart from "./Pages/QuizStartPage";
import QuizResult from "./Pages/QuizResult";

interface Option{
    id: number;
    content: string;
    correct: boolean;
}
interface Quiz {
    id: number;
    name: string;
    username: string;
}
interface Results{
    count:number;
    Quesiton:string;
    answer:string;
    correct: boolean;
    correctAnswer:string;
    quote?:string;
}
interface Question {
    count: number,
    quiz_id: number,
    id: number | undefined,
    content: string,
    options: Option[],
    quote: string,
    timer: number,
}
interface FullQuestion{
    question: Question,
    options: Option[],
}
interface FullQuiz{
    quiz: Quiz,
    questions:FullQuestion[]
}
interface Props{
    id:number,
}
const PAGES = {
    START:"startView",
    PAGE:"pageView",
    RESULT:"resultView",
}
interface pages{
    startView: boolean,
    pageView: boolean,
    resultView: boolean,
}
export default function QuizDisplay(props: Props){
    const { id } = props
    const {data : Quiz, loaded} = useFetch<FullQuiz>("/q/"+id)
    const [score, setScore] = useState(0)
    const [pages, setPages] = useState({
        startView: true,
        pageView: false,
        resultView: false,
    })
    const [result, setResult] = useState<Results[]>([]);
    const [correctQuestions, setCorrectQuestions] = useState(0)
    function navigateTo(page: string){
        Object.keys(pages).forEach((key, value) => {
            key === page ? pages[key as keyof pages] = true : pages[key as keyof pages] = false
          })
        setPages({...pages})
    }
    return(
        <>
            <Loading loaded={loaded}/>
            <QuizStart 
              visible={pages.startView} 
              loaded={loaded} 
              startQuiz={() => navigateTo(PAGES.PAGE)} 
              quizname={Quiz?.quiz.name} 
              questionLength={Quiz?.questions.length}
            />
            {Quiz && 
                <QuizPage setResults={setResult} setCorrectQuestions={setCorrectQuestions} setScore={setScore} score={score} Quiz={Quiz} setVisible={() => navigateTo(PAGES.RESULT)} visible={pages.pageView}/>
            }
            <QuizResult result={result} quizname={Quiz?.quiz.name}  questionLength={Quiz?.questions.length} correctQuestions={correctQuestions} score={score}visible={pages.resultView}/>
        </>
    )
}