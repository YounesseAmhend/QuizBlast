import { useState, useEffect } from "react";
import {Options, NextBtn, Header, Title, Quote} from "./components/index"

interface Option {
    id: number;
    content: string;
    correct: boolean;
}
interface Quiz {
    id: number;
    name: string;
    username: string;
}
interface Question {
    count: number,
    quiz_id: number,
    id: number | undefined,
    content: string,
    options: Option[],
    quote: string,
    timer:number,
}
interface FullQuestion {
    question: Question,
    options: Option[],
}
interface FullQuiz {
    quiz: Quiz,
    questions: FullQuestion[]
}
interface half{
    count:number;
    Quesiton:string;
    quote?:string;
  }
interface Results{
    count:number;
    Quesiton:string;
    answer:string;
    correct: boolean;
    correctAnswer:string;
    quote?:string;
}
interface Props {
    visible: boolean,
    Quiz: FullQuiz,
    score: number
    setVisible(): void,
    setScore:React.Dispatch<React.SetStateAction<number>>
    setCorrectQuestions: React.Dispatch<React.SetStateAction<number>>
    setResults: React.Dispatch<React.SetStateAction<Results[]>>
}

export default function QuizPage(props: Props) {
    const { visible, Quiz, setVisible, score , setScore, setCorrectQuestions, setResults } = props
    const [chosed, setChosed] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined)
    const [halfResult, setResult] = useState<half>();
    useEffect(()=>{
        if(visible)
        setResult({
            count:pageCount,
            Quesiton:Quiz?.questions[pageCount-1].question.content,
            quote:Quiz?.questions[pageCount-1].question.quote,
        })
    },[pageCount, visible])
    console.log(halfResult);
    
    return (
        <>
            {visible &&
                <div className="flex justify-center">
                    <div id="page-container" className="w-4/5 page-container">
                        <Header timer={Quiz?.questions[pageCount-1]?.question.timer} quizname={Quiz.quiz.name} pageCount={pageCount} score={score} questionLength={Quiz?.questions.length}/>
                        <Title title={Quiz.questions[pageCount-1].question.content}/>
                        <Options halfResult={halfResult!} setResults={setResults} setCorrectQuestions={setCorrectQuestions} setScore={setScore} selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={Quiz?.questions[pageCount-1]?.options} setChosed={setChosed}/>
                        <NextBtn questionLength={Quiz.questions.length} setVisible={setVisible} setSelectedOption={setSelectedOption} setChosed={setChosed} pageCount={pageCount} setPageCount={setPageCount} visible={chosed}/>

                        <Quote text={Quiz.questions[pageCount-1]?.question.quote}/>
                    </div>
                </div>
            }
        </>
        
    )
}